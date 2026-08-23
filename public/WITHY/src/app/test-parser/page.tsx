'use client'

import { useState } from 'react';
// 파일 경로가 @/app/actions/netflix 인지 확인하세요!
import { fetchNetflixMetadataAction, NetflixMetadata } from '@/app/actions/netflix';

export default function ParserTestPage() {
  const [url, setUrl] = useState('');
  const [parsedData, setParsedData] = useState<NetflixMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) return alert('넷플릭스 URL을 입력해주세요.');
    
    setLoading(true);
    setParsedData(null);

    try {
      const result = await fetchNetflixMetadataAction(url);
      setParsedData(result);
      if (!result.success) {
        alert('실패: ' + result.error);
      }
    } catch (err) {
      alert('서버 통신 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (parsedData?.rawHtml) {
      navigator.clipboard.writeText(parsedData.rawHtml);
      alert('HTML이 클립보드에 복사되었습니다! VS Code 등에 붙여넣어 보세요.');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h2 style={{ marginBottom: '20px' }}>🛠️ 넷플릭스 데이터 추출 검증기</h2>
      
      {/* 입력 섹션 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.netflix.com/watch/82005440..."
        />
        <button 
          onClick={handleFetch} 
          disabled={loading} 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: loading ? '#ccc' : '#e50914', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '추출 중...' : '데이터 가져오기'}
        </button>
      </div>

      {parsedData && parsedData.success && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          
          {/* 요약 정보 영역 */}
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h3 style={{ marginTop: 0 }}>📌 추출 결과 요약</h3>
            <div style={{ lineHeight: '1.8' }}>
              <p><strong>제목:</strong> <span style={{ color: '#e50914' }}>{parsedData.title}</span></p>
              <p><strong>Video ID:</strong> <code>{parsedData.videoId}</code></p>
              <p><strong>장르:</strong> {parsedData.genres?.join(', ') || '없음'}</p>
              <p><strong>최종 주소:</strong> <a href={parsedData.finalUrl} target="_blank" style={{ fontSize: '12px', wordBreak: 'break-all' }}>{parsedData.finalUrl}</a></p>
            </div>
          </div>

          {/* HTML 소스 분석 영역 */}
          <div>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>전체 HTML 소스 ({parsedData.rawHtml?.length.toLocaleString()} 자)</strong>
              <button 
                onClick={copyToClipboard} 
                style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                📋 전체 복사하기
              </button>
            </div>
            
            <textarea
              value={parsedData.rawHtml}
              readOnly
              style={{
                width: '100%',
                height: '60vh',
                fontFamily: 'monospace',
                fontSize: '12px',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                padding: '15px',
                borderRadius: '8px',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}