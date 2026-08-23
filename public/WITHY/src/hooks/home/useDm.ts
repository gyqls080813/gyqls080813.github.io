import { useState, useRef, useCallback } from 'react';
import { createOrGetDmRoom, getDmMessages, getDmRooms, deleteDmRoom, getDmRoomByTarget } from '@/api/home/dm/dmApi';
import { DmRoomData, DmMessageListResponseData } from '@/api/home/dm/dmTypes';

export const useDm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // [Race Condition Fix] 중복 생성 방지 Lock
    // createRoom이 동시에(비동기 틈새) 여러 번 호출되는 것을 막기 위해 targetUserId를 저장
    const creatingRoomUserRef = useRef<number | null>(null);

    // DM 방 존재 여부 확인 (조회) - 채팅방 진입 시 호출
    const checkRoom = useCallback(async (targetUserId: number): Promise<DmRoomData | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getDmRoomByTarget(targetUserId);
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (err: any) {
            // 404: 방 없음 -> 정상적인 "새 대화" 상태
            if (err.response?.status === 404) {
                return null;
            }
            console.error("[useDm] checkRoom failed", err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // DM 방 생성 / 재진입 (쓰기) - 메시지 전송 시 호출
    const createRoom = useCallback(async (targetUserId: number): Promise<DmRoomData | null> => {
        // 이미 해당 유저에 대해 생성 진행 중이라면 중복 요청 방지
        if (creatingRoomUserRef.current === targetUserId) {
            console.warn(`[useDm] Room creation already in progress for user ${targetUserId}. Skipping duplicate call.`);
            return null;
        }

        creatingRoomUserRef.current = targetUserId; // Lock Acquire
        setIsLoading(true);
        setError(null);
        try {
            const response = await createOrGetDmRoom({ targetUserId });
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("[useDm] DM Room creation/check failed", err);
            // 에러 응답에서 메시지 추출 시도
            const errorMessage = err.response?.data?.message || err.message || "DM 방 생성에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            creatingRoomUserRef.current = null; // Lock Release
            setIsLoading(false);
        }
    }, []);

    // DM 메시지 목록 조회
    const fetchMessages = useCallback(async (roomId: number, page: number = 0, size: number = 20): Promise<DmMessageListResponseData | null> => {
        setIsLoading(true); // 메시지 로딩 시 전체 로딩 상태를 쓸지, 별도 로딩 상태를 쓸지는 UX 결정 사항. 일단 기존 isLoading 공유.
        setError(null);
        try {
            const response = await getDmMessages({ roomId, page, size });
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("DM Messages fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "메시지 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // DM 방 목록 조회
    const fetchDmRooms = useCallback(async (): Promise<DmRoomData[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getDmRooms();
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("DM Rooms fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "DM 방 목록 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // DM 방 나가기
    const leaveRoom = useCallback(async (roomId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteDmRoom(roomId);
            // 성공 시 별도 반환 데이터가 없아도(200 OK) 성공으로 간주
            return true;
        } catch (err: any) {
            console.error("Leave DM Room failed", err);
            const errorMessage = err.response?.data?.message || err.message || "DM 방 나가기에 실패했습니다.";
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        checkRoom,
        createRoom,
        fetchMessages,
        fetchDmRooms,
        leaveRoom,
        isLoading,
        error
    };
};
