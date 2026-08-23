/**
 * 🎯 Performance Profiler — 렌더 시간 + FPS + Web Vitals 통합 측정 유틸리티
 *
 * 사용법:
 *   const perf = usePerformanceProfiler('가계부 페이지');
 *   // 컴포넌트 마운트 시 자동으로 렌더 시간 측정
 *   // perf.fps → 현재 FPS
 *   // perf.renderTime → 마운트까지 걸린 시간 (ms)
 *   // perf.getReport() → 전체 리포트 반환
 */
import { useState, useEffect, useRef, useCallback } from 'react';

// ─── FPS 측정 Hook ───
export function useFPSMonitor(active = true) {
  const [fps, setFps] = useState(60);
  const framesRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef<number>(0);
  const fpsHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    if (!active) return;

    const measure = (now: number) => {
      framesRef.current++;
      const delta = now - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((framesRef.current * 1000) / delta);
        setFps(currentFps);
        fpsHistoryRef.current.push(currentFps);
        // 최근 60초(60개 샘플)만 유지
        if (fpsHistoryRef.current.length > 60) fpsHistoryRef.current.shift();
        framesRef.current = 0;
        lastTimeRef.current = now;
      }

      rafRef.current = requestAnimationFrame(measure);
    };

    rafRef.current = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const getStats = useCallback(() => {
    const history = fpsHistoryRef.current;
    if (history.length === 0) return { avg: 0, min: 0, max: 0, current: fps, samples: 0 };
    return {
      avg: Math.round(history.reduce((a, b) => a + b, 0) / history.length),
      min: Math.min(...history),
      max: Math.max(...history),
      current: fps,
      samples: history.length,
    };
  }, [fps]);

  return { fps, getStats, history: fpsHistoryRef };
}

// ─── 렌더 시간 측정 Hook ───
export function useRenderTime(label: string) {
  const startRef = useRef(performance.now());
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    // 마운트 완료 후 다음 프레임에서 측정 (페인트 포함)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elapsed = performance.now() - startRef.current;
        setRenderTime(elapsed);
        console.log(`[⏱ RenderTime] ${label}: ${elapsed.toFixed(1)}ms`);
      });
    });
  }, [label]);

  return renderTime;
}

// ─── 통합 Performance Profiler ───
export interface PerfReport {
  label: string;
  renderTime: number | null;
  fps: { avg: number; min: number; max: number; current: number; samples: number };
  timestamp: string;
  cacheStatus: 'hit' | 'miss' | 'unknown';
}

export function usePerformanceProfiler(label: string, options?: { trackFps?: boolean }) {
  const renderTime = useRenderTime(label);
  const { fps, getStats } = useFPSMonitor(options?.trackFps ?? true);
  const [cacheStatus, setCacheStatus] = useState<'hit' | 'miss' | 'unknown'>('unknown');

  const markCacheHit = useCallback(() => setCacheStatus('hit'), []);
  const markCacheMiss = useCallback(() => setCacheStatus('miss'), []);

  const getReport = useCallback((): PerfReport => ({
    label,
    renderTime,
    fps: getStats(),
    timestamp: new Date().toISOString(),
    cacheStatus,
  }), [label, renderTime, getStats, cacheStatus]);

  return {
    renderTime,
    fps,
    cacheStatus,
    markCacheHit,
    markCacheMiss,
    getReport,
  };
}

// ─── 인터랙션별 FPS 측정 (드래그, 애니메이션 등) ───
export function useInteractionFPS() {
  const framesRef = useRef(0);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const measuringRef = useRef(false);
  const [result, setResult] = useState<{ fps: number; duration: number; frames: number } | null>(null);

  const startMeasure = useCallback(() => {
    framesRef.current = 0;
    startTimeRef.current = performance.now();
    measuringRef.current = true;

    const count = () => {
      if (!measuringRef.current) return;
      framesRef.current++;
      rafRef.current = requestAnimationFrame(count);
    };
    rafRef.current = requestAnimationFrame(count);
  }, []);

  const stopMeasure = useCallback(() => {
    measuringRef.current = false;
    cancelAnimationFrame(rafRef.current);

    const duration = performance.now() - startTimeRef.current;
    const frames = framesRef.current;
    const fps = Math.round((frames / duration) * 1000);
    const res = { fps, duration: Math.round(duration), frames };
    setResult(res);
    console.log(`[⏱ InteractionFPS] ${fps}fps (${frames} frames in ${Math.round(duration)}ms)`);
    return res;
  }, []);

  return { startMeasure, stopMeasure, result };
}

// ─── 페이지 전환 속도 측정 ───
const navigationTimings: Array<{ from: string; to: string; duration: number; cacheHit: boolean }> = [];

export function measureNavigation(from: string, to: string, cacheHit: boolean) {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    navigationTimings.push({ from, to, duration: Math.round(duration), cacheHit });
    console.log(
      `[⏱ Navigation] ${from} → ${to}: ${Math.round(duration)}ms ${cacheHit ? '(캐시 ✅)' : '(네트워크 🌐)'}`
    );
    return duration;
  };
}

export function getNavigationReport() {
  return navigationTimings;
}
