/**
 * useStickerJobStream — 스티커 생성 작업 SSE 구독 훅
 *
 * 이미지 업로드 후 받은 jobId로 SSE 연결하여 작업 상태를 실시간 추적
 *
 * 사용법:
 *   const { uploadAndTrack, status, progress, error, isComplete } = useStickerJobStream();
 *
 *   await uploadAndTrack(petId, file); // 업로드 + SSE 자동 연결
 */
import { useState, useRef, useCallback } from 'react';
import { uploadPetImage } from './uploadPetImageApi';
import { getAccessToken } from '@/api/tokenManager';

export type StickerJobStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'failed' | 'timeout';

export interface StickerJobEvent {
  status?: string;
  progress?: number;
  resultUrl?: string;
  timeout?: number;
  error?: string;
  [key: string]: unknown;
}

interface UseStickerJobStreamResult {
  /** 이미지 업로드 + SSE 추적 시작 */
  uploadAndTrack: (petId: number, file: File) => Promise<void>;
  /** 현재 상태 */
  status: StickerJobStatus;
  /** SSE에서 받은 최신 이벤트 데이터 */
  lastEvent: StickerJobEvent | null;
  /** 업로드된 이미지 URL */
  imageUrl: string | null;
  /** 에러 메시지 */
  error: string | null;
  /** 완료 여부 */
  isComplete: boolean;
  /** SSE 연결 해제 */
  disconnect: () => void;
}

export function useStickerJobStream(): UseStickerJobStreamResult {
  const [status, setStatus] = useState<StickerJobStatus>('idle');
  const [lastEvent, setLastEvent] = useState<StickerJobEvent | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const connectSSE = useCallback(async (jobId: string) => {
    disconnect();
    setStatus('processing');

    const { fetchEventSource } = await import('@microsoft/fetch-event-source');
    const token = getAccessToken();
    const ctrl = new AbortController();
    // AbortController를 ref에 저장 (disconnect 용)
    eventSourceRef.current = { close: () => ctrl.abort() } as any;

    await fetchEventSource(`/api/v1/stickers/jobs/${jobId}/stream`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/event-stream',
      },
      signal: ctrl.signal,
      onmessage(event) {
        // 백엔드는 event name으로 상태를 구분함
        if (event.event === 'connect') return; // 연결 성공 알림 무시

        // 완료: 스티커 생성 완료 (event name = "complete")
        if (event.event === 'complete') {
          setStatus('completed');
          // data에 이미지 URL 배열이 들어올 수 있음
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data) && data.length > 0) setImageUrl(data[0]);
          } catch {}
          ctrl.abort();
          return;
        }

        // 실패: GPU 이미지 생성 실패 (event name = "error")
        if (event.event === 'error') {
          setStatus('failed');
          setError(event.data || '스티커 생성에 실패했습니다.');
          ctrl.abort();
          return;
        }
      },
      onclose() {
        if (status !== 'completed' && status !== 'failed') {
          setStatus('completed');
        }
      },
      onerror() {
        if (status !== 'completed' && status !== 'failed') {
          setStatus('completed');
        }
        ctrl.abort();
      },
      openWhenHidden: true,
    });
  }, [disconnect, status]);

  const uploadAndTrack = useCallback(async (petId: number, file: File) => {
    setStatus('uploading');
    setError(null);
    setImageUrl(null);
    setLastEvent(null);

    try {
      const res = await uploadPetImage(petId, file);
      const { url, jobId } = res.data;
      setImageUrl(url);

      // jobId로 SSE 연결
      if (jobId) {
        connectSSE(jobId);
      } else {
        // jobId 없으면 바로 완료
        setStatus('completed');
      }
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    }
  }, [connectSSE]);

  return {
    uploadAndTrack,
    status,
    lastEvent,
    imageUrl,
    error,
    isComplete: status === 'completed',
    disconnect,
  };
}
