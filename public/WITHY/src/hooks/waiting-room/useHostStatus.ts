import { useRef } from 'react';

/**
 * 호스트 여부를 관리하는 Hook
 * 입장 시점의 isHost 값을 ref로 보존하여 다른 컴포넌트의 상태 변경에 영향받지 않도록 함
 */
export const useHostStatus = (storedIsHost: boolean): boolean => {
    const initialIsHostRef = useRef<boolean | null>(null);

    // 최초 마운트 시점에 storedIsHost 값을 저장
    if (initialIsHostRef.current === null && storedIsHost !== false) {
        initialIsHostRef.current = storedIsHost;
    }

    // ref에 저장된 초기값 사용, fallback으로 storedIsHost 사용
    return initialIsHostRef.current ?? storedIsHost;
};
