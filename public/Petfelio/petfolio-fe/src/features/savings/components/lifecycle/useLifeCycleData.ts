import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { usePets } from '@/features/pet';
import { getPetDetail, getLifeCycleApi, getLifeCycleByPetIdApi, updateLifeCycleChecklistApi } from '@/features/group/api/pet';
import { LifeCycleResponse } from '@/features/group/types/pet';

function calcAgeFromBirthdate(birthdate: string): number {
  const birth = new Date(birthdate);
  const now   = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return Math.max(0, age);
}

const STAGE_PRIORITY: Record<string, number> = {
  '유년기': 1,
  '청년기': 2,
  '중년기': 3,
  '노년기': 4,
};

function sortLifeStages(stages: LifeCycleResponse['lifeStages']) {
  return [...stages].sort((a, b) => {
    const getP = (name: string) => {
      if (name.includes('유년기')) return STAGE_PRIORITY['유년기'];
      if (name.includes('청년기')) return STAGE_PRIORITY['청년기'];
      if (name.includes('중년기')) return STAGE_PRIORITY['중년기'];
      if (name.includes('노년기')) return STAGE_PRIORITY['노년기'];
      return 99;
    };
    return getP(a.stageName) - getP(b.stageName);
  });
}

export const useLifeCycleData = () => {
  const { pets, loading: petsLoading } = usePets();

  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const [lifeCycleData, setLifeCycleData] = useState<LifeCycleResponse | null>(null);
  const [lcLoading, setLcLoading] = useState(false);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  const fetchLifeCycle = useCallback(async () => {
    // 실제 펫이 없으면 API 호출 없이 중단 (더미 데이터 사용 안 함)

    if (pets.length === 0) {
      setLifeCycleData(null);
      return;
    }

    const pet = pets[selectedPetIndex];
    if (!pet) return;

    setLcLoading(true);
    setLifeCycleData(null);
    try {
      let lcRes;
      
      const fetchFallback = async () => {
        let birthdate: string | undefined;
        try {
          const detailRes = await getPetDetail(pet.id);
          birthdate = detailRes.data?.birthdate;
        } catch {}
        const age = birthdate ? calcAgeFromBirthdate(birthdate) : 2;
        const breedParam = pet.breed?.trim() || '믹스';
        return await getLifeCycleApi(breedParam, age);
      };

      if (pet.id) {
        try {
          lcRes = await getLifeCycleByPetIdApi(pet.id);
          const tempIsDirect = 'lifeStages' in lcRes || 'currentStageName' in lcRes;
          const tempData = tempIsDirect ? (lcRes as unknown as LifeCycleResponse) : lcRes.data;
          if (!tempData || !tempData.lifeStages || tempData.lifeStages.length === 0) {
            throw new Error('Empty lifeStages returned from getLifeCycleByPetIdApi');
          }
        } catch (innerErr) {
          console.warn('[getLifeCycleByPetIdApi failed or empty, falling back]', innerErr);
          lcRes = await fetchFallback();
        }
      } else {
        lcRes = await fetchFallback();
      }
      
      const isDirectFormat = 'lifeStages' in lcRes || 'currentStageName' in lcRes;
      const data = isDirectFormat ? (lcRes as unknown as LifeCycleResponse) : lcRes.data;
      
      if (!data || !data.lifeStages || data.lifeStages.length === 0) {
        setLifeCycleData(null); 
      } else {
        const sortedStages = sortLifeStages(data.lifeStages);
        setLifeCycleData({ ...data, lifeStages: sortedStages } as LifeCycleResponse);
      }
    } catch (e) {
      console.error('[lifecycle fetch error]', e);
      setLifeCycleData(null);
    } finally {
      setLcLoading(false);
    }
  }, [pets, selectedPetIndex]);


  const needsReset = useRef(true);

  useEffect(() => {
    needsReset.current = true;
    fetchLifeCycle();
  }, [selectedPetIndex, pets, fetchLifeCycle]);


  const updateChecklist = async (lifeStageId: number, category: string, isChecked: boolean) => {
    const pet = pets.length > 0 ? pets[selectedPetIndex] : null;
    if (!pet || !pet.id) return false;
    
    // 낙관적 업데이트(Optimistic Update): UI 반응을 즉시 반영
    const previousData = lifeCycleData;
    if (lifeCycleData) {
      const newData = { ...lifeCycleData };
      newData.lifeStages = sortLifeStages(newData.lifeStages.map(stage => {
        if (stage.lifeStageId === lifeStageId) {
          return {
            ...stage,
            checklist: stage.checklist.map(item => {
              if (item.category === category) {
                return { ...item, isChecked };
              }
              return item;
            })
          };
        }
        return stage;
      }));
      setLifeCycleData(newData);
    }


    try {
      // API call to update checklist (백그라운드에서 조용히 처리)
      await updateLifeCycleChecklistApi(pet.id, lifeStageId, {
        statuses: [{ category, isChecked }]
      });
      // API 호출 성공: 화면 깜빡임을 유발하는 fetchLifeCycle() 전체 조회를 생략합니다.
      return true;
    } catch (err) {
      console.error('[Checklist Update Failed]', err);
      // 실패 시 기존 상태로 원복(Rollback)
      if (previousData) {
        setLifeCycleData(previousData);
      }
      return false;
    }
  };

  useEffect(() => {
    if (lifeCycleData?.lifeStages && needsReset.current) {
      const index = lifeCycleData.lifeStages.findIndex(
        s => s.stageName.includes(lifeCycleData.currentStageName)
      );
      if (index !== -1) {
        setSelectedStageIndex(index);
      } else {
        setSelectedStageIndex(0);
      }
      needsReset.current = false;
    }
  }, [lifeCycleData]);

  const stages = useMemo(() => lifeCycleData?.lifeStages ?? [], [lifeCycleData]);
  const selectedStage = useMemo(() => stages[selectedStageIndex] || null, [stages, selectedStageIndex]);
  const currentPet = pets.length > 0 ? pets[selectedPetIndex] : null;

  return {
    pets,
    petsLoading,
    stickersLoading: false,
    selectedPetIndex,
    setSelectedPetIndex,
    lifeCycleData,
    lcLoading,
    selectedStageIndex,
    setSelectedStageIndex,
    stickerImageUrl: undefined,
    stages,
    selectedStage,
    currentPet,
    updateChecklist,
  };
};
