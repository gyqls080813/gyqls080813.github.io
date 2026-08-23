import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useFPSMonitor, useRenderTime, useInteractionFPS } from '@/shared/hooks/usePerformanceProfiler';
import { queryKeys } from '@/shared/hooks/queryKeys';

// API 함수
import { getMonthlyLedgerSummary } from '@/features/calendar/api/getMonthlyLedgerSummaryApi';
import { getConsumables } from '@/features/supplies/api/getConsumablesApi';
import { getRanking } from '@/features/home/api/dashboardApi';
import { getCardList } from '@/features/finance/api/getCardListApi';

/** ─── 개별 벤치마크 결과 ─── */
interface BenchResult {
  label: string;
  coldMs: number;   // 캐시 없이 (네트워크)
  warmMs: number;   // 캐시 히트
  savedMs: number;  // 절감
  improvement: string; // 퍼센트
}

/** ─── FPS 구간 결과 ─── */
interface FPSResult {
  scenario: string;
  avgFps: number;
  minFps: number;
  maxFps: number;
  duration: number;
  verdict: string; // SMOOTH / GOOD / JANKY
}

export default function PerfPage() {
  const queryClient = useQueryClient();
  const renderTime = useRenderTime('PerfPage');
  const { fps, getStats } = useFPSMonitor(true);
  const { startMeasure, stopMeasure, result: interactionResult } = useInteractionFPS();

  // ─── 벤치마크 상태 ───
  const [benchResults, setBenchResults] = useState<BenchResult[]>([]);
  const [fpsResults, setFpsResults] = useState<FPSResult[]>([]);
  const [running, setRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState('');
  const [progress, setProgress] = useState(0);

  // ─── FPS 애니메이션 테스트용 상태 ───
  const [animActive, setAnimActive] = useState(false);
  const [animBoxes, setAnimBoxes] = useState<number[]>([]);
  const fpsCollectorRef = useRef<number[]>([]);

  /** ── 단일 API의 Cold(네트워크) vs Warm(캐시) 속도 비교 ── */
  const benchmarkApi = async (
    label: string,
    queryKey: readonly unknown[],
    fetchFn: () => Promise<unknown>,
  ): Promise<BenchResult> => {
    // 1) 캐시 완전 제거 → Cold 측정 (네트워크 왕복)
    queryClient.removeQueries({ queryKey });
    const coldStart = performance.now();
    const data = await fetchFn();
    const coldMs = performance.now() - coldStart;

    // fetchFn 결과를 React Query 캐시에 저장
    queryClient.setQueryData(queryKey, data);

    // 2) 캐시에서 직접 읽기 → Warm 측정 (메모리만, 네트워크 0회)
    const warmStart = performance.now();
    const cached = queryClient.getQueryData(queryKey);
    // 캐시 접근 후 간단한 직렬화(실제 컴포넌트가 데이터를 사용하는 것과 유사)
    if (cached) JSON.stringify(cached);
    const warmMs = performance.now() - warmStart;

    const savedMs = coldMs - warmMs;
    const improvement = coldMs > 0 ? `${Math.round((savedMs / coldMs) * 100)}%` : '0%';

    return { label, coldMs: Math.round(coldMs), warmMs: Math.round(warmMs), savedMs: Math.round(savedMs), improvement };
  };

  /** ── 전체 벤치마크 실행 ── */
  const runBenchmark = useCallback(async () => {
    setRunning(true);
    setBenchResults([]);
    const results: BenchResult[] = [];
    const tests = [
      { label: '가계부 월간 요약', key: queryKeys.ledger.monthly(2026, 3), fn: () => getMonthlyLedgerSummary(2026, 3) },
      { label: '소모품 목록', key: queryKeys.consumables.list(), fn: () => getConsumables() },
      { label: '랭킹', key: queryKeys.dashboard.ranking(), fn: () => getRanking() },
      { label: '카드 목록', key: queryKeys.cards.list(), fn: () => getCardList() },
    ];

    for (let i = 0; i < tests.length; i++) {
      const t = tests[i];
      setCurrentTest(t.label);
      setProgress(((i + 1) / tests.length) * 100);

      // 3회 반복 평균
      let totalCold = 0, totalWarm = 0;
      const RUNS = 3;
      for (let r = 0; r < RUNS; r++) {
        const res = await benchmarkApi(t.label, t.key, t.fn);
        totalCold += res.coldMs;
        totalWarm += res.warmMs;
        await new Promise(ok => setTimeout(ok, 200)); // 쿨다운
      }
      const avgCold = Math.round(totalCold / RUNS);
      const avgWarm = Math.round(totalWarm / RUNS);
      const savedMs = avgCold - avgWarm;
      results.push({
        label: t.label,
        coldMs: avgCold,
        warmMs: avgWarm,
        savedMs,
        improvement: avgCold > 0 ? `${Math.round((savedMs / avgCold) * 100)}%` : '0%',
      });
    }

    setBenchResults(results);
    setRunning(false);
    setCurrentTest('');
    setProgress(100);
  }, [queryClient]);

  /** ── FPS 스트레스 테스트: 다수 DOM 애니메이션 ── */
  const runFPSTest = useCallback(async () => {
    const scenarios = [
      { name: '정적 화면 (Idle)', boxCount: 0, duration: 3000 },
      { name: 'DOM 50개 애니메이션', boxCount: 50, duration: 3000 },
      { name: 'DOM 100개 애니메이션', boxCount: 100, duration: 3000 },
      { name: 'DOM 200개 애니메이션', boxCount: 200, duration: 3000 },
    ];

    const results: FPSResult[] = [];

    for (const scenario of scenarios) {
      setCurrentTest(`FPS: ${scenario.name}`);
      fpsCollectorRef.current = [];
      setAnimBoxes(Array.from({ length: scenario.boxCount }, (_, i) => i));
      setAnimActive(true);

      // FPS 수집 시작
      let collecting = true;
      const collectFps = () => {
        if (!collecting) return;
        fpsCollectorRef.current.push(fps);
        requestAnimationFrame(collectFps);
      };
      requestAnimationFrame(collectFps);

      await new Promise(ok => setTimeout(ok, scenario.duration));
      collecting = false;
      setAnimActive(false);
      setAnimBoxes([]);

      const samples = fpsCollectorRef.current.filter(f => f > 0);
      if (samples.length > 0) {
        const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
        const min = Math.min(...samples);
        const max = Math.max(...samples);
        results.push({
          scenario: scenario.name,
          avgFps: avg,
          minFps: min,
          maxFps: max,
          duration: scenario.duration,
          verdict: avg >= 55 ? '🟢 SMOOTH' : avg >= 30 ? '🟡 GOOD' : '🔴 JANKY',
        });
      }

      await new Promise(ok => setTimeout(ok, 500)); // 쿨다운
    }

    setFpsResults(results);
    setCurrentTest('');
  }, [fps]);

  // ─── 스크롤 FPS 테스트 ───
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const runScrollFPSTest = useCallback(async () => {
    setCurrentTest('FPS: 스크롤 성능');
    fpsCollectorRef.current = [];

    let collecting = true;
    const collectFps = () => {
      if (!collecting) return;
      fpsCollectorRef.current.push(fps);
      requestAnimationFrame(collectFps);
    };
    requestAnimationFrame(collectFps);

    // 프로그래밍적으로 스크롤
    const el = scrollContentRef.current;
    if (el) {
      const scrollStep = 5;
      const totalScroll = el.scrollHeight - el.clientHeight;
      let currentScroll = 0;
      const doScroll = () => {
        currentScroll += scrollStep;
        el.scrollTop = currentScroll;
        if (currentScroll < totalScroll) requestAnimationFrame(doScroll);
      };
      requestAnimationFrame(doScroll);

      await new Promise(ok => setTimeout(ok, 3000));
    }

    collecting = false;
    const samples = fpsCollectorRef.current.filter(f => f > 0);
    if (samples.length > 0) {
      const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
      setFpsResults(prev => [...prev, {
        scenario: '긴 리스트 스크롤',
        avgFps: avg,
        minFps: Math.min(...samples),
        maxFps: Math.max(...samples),
        duration: 3000,
        verdict: avg >= 55 ? '🟢 SMOOTH' : avg >= 30 ? '🟡 GOOD' : '🔴 JANKY',
      }]);
    }
    setCurrentTest('');
  }, [fps]);

  // ─── 결과 클립보드 복사 ───
  const copyResults = useCallback(() => {
    const lines: string[] = ['# PetFolio Performance Benchmark', '', `측정 시각: ${new Date().toLocaleString()}`, ''];

    if (benchResults.length > 0) {
      lines.push('## API 응답 속도 (Cold vs Warm Cache)', '');
      lines.push('| API | Cold (ms) | Warm (ms) | 절감 (ms) | 개선율 |');
      lines.push('|-----|----------|----------|----------|--------|');
      for (const r of benchResults) {
        lines.push(`| ${r.label} | ${r.coldMs} | ${r.warmMs} | ${r.savedMs} | **${r.improvement}** |`);
      }
      const totalCold = benchResults.reduce((s, r) => s + r.coldMs, 0);
      const totalWarm = benchResults.reduce((s, r) => s + r.warmMs, 0);
      lines.push(`| **합계** | **${totalCold}** | **${totalWarm}** | **${totalCold - totalWarm}** | **${Math.round(((totalCold - totalWarm) / totalCold) * 100)}%** |`);
      lines.push('');
    }

    if (fpsResults.length > 0) {
      lines.push('## FPS 측정', '');
      lines.push('| 시나리오 | 평균 FPS | 최소 | 최대 | 판정 |');
      lines.push('|---------|---------|------|------|------|');
      for (const r of fpsResults) {
        lines.push(`| ${r.scenario} | ${r.avgFps} | ${r.minFps} | ${r.maxFps} | ${r.verdict} |`);
      }
      lines.push('');
    }

    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => alert('📋 결과가 클립보드에 복사되었습니다!'));
  }, [benchResults, fpsResults]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px', fontFamily: 'Pretendard, sans-serif' }}>
      {/* ── 헤더 ── */}
      <h1 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 4 }}>⚡ Performance Benchmark</h1>
      <p style={{ fontSize: '0.82em', color: '#888', marginBottom: 24 }}>
        PetFolio 프론트엔드 성능 측정 도구
      </p>

      {/* ── 실시간 모니터 ── */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24,
      }}>
        <div style={cardStyle}>
          <div style={labelStyle}>현재 FPS</div>
          <div style={{ ...valueStyle, color: fps >= 55 ? '#34c759' : fps >= 30 ? '#ff9500' : '#ff3b30' }}>
            {fps}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>페이지 렌더</div>
          <div style={valueStyle}>{renderTime ? `${renderTime.toFixed(0)}ms` : '측정중...'}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>FPS 상태</div>
          <div style={valueStyle}>{fps >= 55 ? '🟢' : fps >= 30 ? '🟡' : '🔴'}</div>
        </div>
      </div>

      {/* ── 진행 표시 ── */}
      {running && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.82em', color: '#666', marginBottom: 6 }}>
            {currentTest} 측정 중...
          </div>
          <div style={{ height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg, #3182f6, #34c759)',
              borderRadius: 3, transition: 'width 0.3s',
            }} />
          </div>
        </div>
      )}

      {/* ── 벤치마크 버튼들 ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={runBenchmark} disabled={running} style={btnStyle('#3182f6')}>
          🏎️ API 캐시 벤치마크
        </button>
        <button onClick={runFPSTest} disabled={running} style={btnStyle('#34c759')}>
          🎬 FPS 스트레스 테스트
        </button>
        <button onClick={runScrollFPSTest} disabled={running} style={btnStyle('#ff9500')}>
          📜 스크롤 FPS
        </button>
      </div>

      {/* ── API 벤치마크 결과 ── */}
      {benchResults.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>📊 API 응답 속도 (Cold vs Warm Cache)</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>API</th>
                <th style={thStyle}>Cold 🌐</th>
                <th style={thStyle}>Warm ✅</th>
                <th style={thStyle}>절감</th>
                <th style={thStyle}>개선율</th>
              </tr>
            </thead>
            <tbody>
              {benchResults.map((r, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{r.label}</td>
                  <td style={{ ...tdStyle, color: '#ff3b30', fontWeight: 600 }}>{r.coldMs}ms</td>
                  <td style={{ ...tdStyle, color: '#34c759', fontWeight: 600 }}>{r.warmMs}ms</td>
                  <td style={tdStyle}>{r.savedMs}ms</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#3182f6' }}>{r.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 캐시 히트 바 차트 */}
          <div style={{ marginTop: 16 }}>
            {benchResults.map((r, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: '0.75em', color: '#666', marginBottom: 3 }}>{r.label}</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <div style={{ ...barStyle, width: `${Math.min(r.coldMs / 5, 100)}%`, background: '#ff6b6b' }} />
                  <span style={{ fontSize: '0.7em', color: '#ff3b30' }}>{r.coldMs}ms</span>
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <div style={{ ...barStyle, width: `${Math.min(r.warmMs / 5, 100)}%`, background: '#51cf66' }} />
                  <span style={{ fontSize: '0.7em', color: '#34c759' }}>{r.warmMs}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FPS 결과 ── */}
      {fpsResults.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>🎬 FPS 측정 결과</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>시나리오</th>
                <th style={thStyle}>평균</th>
                <th style={thStyle}>최소</th>
                <th style={thStyle}>최대</th>
                <th style={thStyle}>판정</th>
              </tr>
            </thead>
            <tbody>
              {fpsResults.map((r, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{r.scenario}</td>
                  <td style={{ ...tdStyle, fontWeight: 700 }}>{r.avgFps}</td>
                  <td style={tdStyle}>{r.minFps}</td>
                  <td style={tdStyle}>{r.maxFps}</td>
                  <td style={tdStyle}>{r.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 결과 복사 버튼 ── */}
      {(benchResults.length > 0 || fpsResults.length > 0) && (
        <button onClick={copyResults} style={btnStyle('#8e44ad')}>
          📋 결과 마크다운 복사
        </button>
      )}

      {/* ── FPS 스트레스 테스트용 애니메이션 컨테이너 ── */}
      {animActive && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          pointerEvents: 'none', zIndex: 9999, overflow: 'hidden',
        }}>
          {animBoxes.map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 20, height: 20,
              borderRadius: 4,
              background: `hsl(${(i * 37) % 360}, 70%, 60%)`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animation: `perfBounce ${0.5 + Math.random() * 1.5}s ease-in-out infinite alternate`,
            }} />
          ))}
        </div>
      )}

      {/* ── 스크롤 테스트용 긴 리스트 ── */}
      <div ref={scrollContentRef} style={{
        maxHeight: 200, overflow: 'auto', marginTop: 20,
        border: '1px solid #e0e0e0', borderRadius: 12, display: 'none',
      }}>
        {Array.from({ length: 500 }, (_, i) => (
          <div key={i} style={{
            padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>항목 #{i + 1}</span>
            <span style={{ color: '#888' }}>{Math.round(Math.random() * 50000)}원</span>
          </div>
        ))}
      </div>

      {/* ── CSS 애니메이션 ── */}
      <style>{`
        @keyframes perfBounce {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-30px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

// ─── 스타일 ───
const cardStyle: React.CSSProperties = {
  flex: 1, padding: '14px 12px', borderRadius: 14,
  background: '#f8f9fa', border: '1px solid #e9ecef', textAlign: 'center',
};
const labelStyle: React.CSSProperties = { fontSize: '0.7em', color: '#888', marginBottom: 4 };
const valueStyle: React.CSSProperties = { fontSize: '1.3em', fontWeight: 800 };
const btnStyle = (bg: string): React.CSSProperties => ({
  padding: '10px 18px', borderRadius: 10, border: 'none',
  background: bg, color: 'white', fontWeight: 700, fontSize: '0.85em',
  cursor: 'pointer', whiteSpace: 'nowrap',
});
const sectionTitle: React.CSSProperties = { fontSize: '1em', fontWeight: 700, marginBottom: 12 };
const tableStyle: React.CSSProperties = {
  width: '100%', borderCollapse: 'collapse', fontSize: '0.78em',
};
const thStyle: React.CSSProperties = {
  padding: '8px 6px', textAlign: 'left', borderBottom: '2px solid #dee2e6',
  fontSize: '0.85em', color: '#666',
};
const tdStyle: React.CSSProperties = {
  padding: '8px 6px', borderBottom: '1px solid #f0f0f0',
};
const barStyle: React.CSSProperties = {
  height: 8, borderRadius: 4, minWidth: 4, transition: 'width 0.5s',
};
