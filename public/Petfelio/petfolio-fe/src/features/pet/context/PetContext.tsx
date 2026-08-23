import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/api/request';
import { getAccessToken } from '@/api/tokenManager';
import type { Pet, StickerImage } from '../types';
import type { ApiResponse } from '@/types/api';
import { uploadPetImage } from '../api/uploadPetImageApi';
import { getDefaultStickerImage } from '../utils/defaultStickerImages';
import type { StickerJobStatus } from '../api/useStickerJobStream';

const NO_FETCH_PAGES = ['/', '/login', '/register', '/onboarding', '/onboarding/step1', '/onboarding/step2'];

interface PetContextValue {
  pets: Pet[];
  petNames: string[];
  loading: boolean;
  refresh: () => Promise<void>;
  /** petId → 카테고리별 스티커 이미지 배열 */
  stickerImages: Record<number, StickerImage[]>;
  /** 특정 펫의 특정 카테고리 스티커 URL 조회 */
  getStickerByCategory: (petId: number, categoryId: number) => string | undefined;
  /** 특정 펫의 원본 업로드 이미지 URL 조회 */
  getOriginalImage: (petId: number) => string | undefined;
  /** 스티커 업로드 + SSE 추적 */
  uploadSticker: (petId: number, file: File) => Promise<void>;
  /** 특정 펫의 스티커 상태 */
  stickerStatus: Record<number, StickerJobStatus>;
  /** 특정 펫의 스티커 목록 로드 */
  fetchStickers: (petId: number) => Promise<void>;
  /** 홈 화면 대표 반려동물 ID */
  mainPetId: number | null;
  /** 대표 반려동물 설정 함수 */
  setMainPetId: (id: number) => void;
}


const PetContext = createContext<PetContextValue>({
  pets: [],
  petNames: [],
  loading: true,
  refresh: async () => {},
  stickerImages: {},
  getStickerByCategory: () => undefined,
  getOriginalImage: () => undefined,
  uploadSticker: async () => {},
  stickerStatus: {},
  fetchStickers: async () => {},
  mainPetId: null,
  setMainPetId: () => {},
});


export const usePets = () => useContext(PetContext);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [stickerImages, setStickerImages] = useState<Record<number, StickerImage[]>>({});
  const [stickerStatus, setStickerStatus] = useState<Record<number, StickerJobStatus>>({});
  const [completedPet, setCompletedPet] = useState<{ id: number, name: string } | null>(null);
  const [mainPetId, setMainPetIdState] = useState<number | null>(null);
  const eventSourcesRef = useRef<Record<number, EventSource>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('petfolio_main_pet_id');
      if (saved) setMainPetIdState(Number(saved));
    }
  }, []);

  const setMainPetId = useCallback((id: number) => {
    setMainPetIdState(id);
    localStorage.setItem('petfolio_main_pet_id', id.toString());
  }, []);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request<ApiResponse<Pet[]>>('/api/v1/pets', 'GET');

      const petList = res.data || [];
      setPets(petList);
    } catch (err) {
      console.error('[펫 목록 fetch 실패]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── 특정 펫의 스티커 목록 로드 (404 = 스티커 없음, 조용히 무시) ───
  const fetchStickers = useCallback(async (petId: number) => {
    try {
      const token = getAccessToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/v1/stickers/${petId}/image`, {
        method: 'GET',
        credentials: 'include',
        headers,
      });
      if (!res.ok) {
        return;
      }
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setStickerImages(prev => ({ ...prev, [petId]: json.data }));
      }
    } catch {
      // 네트워크 에러 등 조용히 무시
    }
  }, []);

  // ─── 헬퍼: 카테고리별 스티커 URL 조회 (없으면 디폴트 이미지) ───
  const getStickerByCategory = useCallback((petId: number, categoryId: number): string | undefined => {
    const stickers = stickerImages[petId];
    const found = stickers?.find(s => s.categoryId === categoryId)?.imageUrl;
    return found || getDefaultStickerImage(categoryId);
  }, [stickerImages]);

  // ─── 헬퍼: 원본 이미지 (categoryId 없는 것 또는 첫 번째) ───
  const getOriginalImage = useCallback((petId: number): string | undefined => {
    const stickers = stickerImages[petId];
    if (!stickers || stickers.length === 0) return undefined;
    // categoryId가 0이거나, 가장 작은 categoryId를 원본으로 간주
    const original = stickers.find(s => s.categoryId === 0) || stickers[0];
    return original?.imageUrl;
  }, [stickerImages]);

  const prevPathRef = useRef(router.pathname);

  // 마운트 시 및 경로 변경 시 데이터 로드 추적
  useEffect(() => {
    const wasNoFetch = NO_FETCH_PAGES.includes(prevPathRef.current);
    const isNowFetch = !NO_FETCH_PAGES.includes(router.pathname);

    // 1. 처음 마운트되었을 때 또는 NO_FETCH 페이지에서 일반 페이지로 이동했을 때
    // 2. 혹은 일반 페이지인데 데이터가 아직 없을 때
    if (isNowFetch && (wasNoFetch || pets.length === 0)) {
      fetchPets();
    } else if (!isNowFetch) {
      setLoading(false);
      return;
    }
    if (pets.length === 0 && !hasFetched.current) {
      hasFetched.current = true;
      fetchPets();
    }

    prevPathRef.current = router.pathname;

    return () => {
      // 언마운트 시 모든 SSE 연결 해제 (Provider는 거의 언마운트 안 됨)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(eventSourcesRef.current).forEach(es => es.close());
    };
  }, [router.pathname, pets.length, fetchPets]);


  // 펫 로드 후 각 펫의 스티커 자동 로드 (캐싱: 이미 로드된 펫은 스킵)
  useEffect(() => {
    pets.forEach(pet => {
      if (!stickerImages[pet.id]) {
        fetchStickers(pet.id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets, fetchStickers]);

  // ─── 스티커 업로드 + SSE 추적 ───
  const uploadSticker = useCallback(async (petId: number, file: File) => {
    setStickerStatus(prev => ({ ...prev, [petId]: 'uploading' }));

    try {
      const res = await uploadPetImage(petId, file);
      const { jobId } = res.data;

      if (!jobId) {
        setStickerStatus(prev => ({ ...prev, [petId]: 'completed' }));
        // jobId 없으면 바로 스티커 목록 갱신
        await fetchStickers(petId);
        return;
      }

      // SSE 연결 (직통 - fetch-event-source)
      setStickerStatus(prev => ({ ...prev, [petId]: 'processing' }));

      // 기존 연결 해제
      if (eventSourcesRef.current[petId]) {
        eventSourcesRef.current[petId].close();
      }

      const { fetchEventSource } = await import('@microsoft/fetch-event-source');
      const token = getAccessToken();
      const ctrl = new AbortController();

      // AbortController를 eventSourcesRef에 저장 (정리용)
      eventSourcesRef.current[petId] = { close: () => ctrl.abort() } as any;

      const onStickerComplete = () => {
        setStickerStatus(prev => ({ ...prev, [petId]: 'completed' }));
        delete eventSourcesRef.current[petId];

        // 완료 시 팝업 띄우기
        setPets(currentPets => {
          const petName = currentPets.find(p => p.id === petId)?.name || '반려동물';
          setCompletedPet({ id: petId, name: petName });
          return currentPets;
        });

        // 스티커 폴링 재시도: 2초마다 최대 15회까지 스티커 로드 시도
        let retryCount = 0;
        const pollStickers = setInterval(async () => {
          retryCount++;
          console.log(`[스티커 SSE] 스티커 로드 시도 ${retryCount}/15`);
          try {
            const t = getAccessToken();
            const headers: Record<string, string> = {};
            if (t) headers['Authorization'] = `Bearer ${t}`;
            const res = await fetch(`/api/v1/stickers/${petId}/image`, {
              method: 'GET', credentials: 'include', headers,
            });
            if (res.ok) {
              const json = await res.json();
              if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                setStickerImages(prev => ({ ...prev, [petId]: json.data }));
                clearInterval(pollStickers);
                console.log('[스티커 SSE] 스티커 로드 성공!');
                return;
              }
            }
          } catch {}
          if (retryCount >= 15) {
            clearInterval(pollStickers);
            fetchStickers(petId);
          }
        }, 2000);
      };

      fetchEventSource(`/api/v1/stickers/jobs/${jobId}/stream`, {
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
            ctrl.abort();
            onStickerComplete();
            return;
          }
          // 실패: GPU 이미지 생성 실패 (event name = "error")
          if (event.event === 'error') {
            setStickerStatus(prev => ({ ...prev, [petId]: 'failed' }));
            ctrl.abort();
            return;
          }
        },
        onclose() {
          console.log('[스티커 SSE] 연결 종료 → 스티커 갱신');
          onStickerComplete();
        },
        onerror() {
          console.log('[스티커 SSE] 에러 발생 → 스티커 갱신');
          ctrl.abort();
          onStickerComplete();
        },
        openWhenHidden: true,
      });

    } catch (err) {
      console.error('[스티커 업로드 실패]', err);
      setStickerStatus(prev => ({ ...prev, [petId]: 'failed' }));
    }
  }, [fetchStickers]);

  const petNames = pets.map(p => p.name);

  return (
    <PetContext.Provider value={{
      pets,
      petNames,
      loading,
      refresh: fetchPets,
      stickerImages,
      getStickerByCategory,
      getOriginalImage,
      uploadSticker,
      stickerStatus,
      fetchStickers,
      mainPetId,
      setMainPetId
    }}>
      {children}
      {/* 전역 SSE 완료 모달 */}
      {completedPet && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-[340px] p-6 shadow-xl flex flex-col items-center">
            <div className="text-[40px] mb-3">✨</div>
            <div className="text-[1.1rem] font-bold text-[#3d2c1e] mb-1">
              완료되었어요!
            </div>
            <div className="text-[0.88rem] text-[#8c7d6e] text-center mb-6">
              {completedPet.name}의 AI 배경 제거 및 9가지 스티커 세트 생성이 모두 끝났습니다.
            </div>
            <button
              onClick={() => setCompletedPet(null)}
              className="w-full py-3.5 rounded-xl border-none bg-[#3182f6] text-white font-bold text-[0.95rem] cursor-pointer hover:bg-[#1b6de8] transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </PetContext.Provider>
  );
};
