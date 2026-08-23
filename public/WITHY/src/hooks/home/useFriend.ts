import { useState, useCallback } from 'react';
import { getFriendList, getReceivedFriendRequests, respondFriendRequest, deleteFriend, unblockUser, searchUsers, sendFriendRequest, getBlockList, getSentFriendRequests, cancelFriendRequest } from '@/api/home/friend/friendApi';
import { FriendData, FriendRequest, SearchedUserData, BlockedUserData, SentFriendRequest } from '@/api/home/friend/friendTypes';
import { myProfileApi } from '@/api/user/MyProfile';
import { responseMyProfile } from '@/constants/user/MyProfile';

export const useFriend = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 친구 목록 조회
    const fetchFriends = useCallback(async (): Promise<FriendData[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFriendList();
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("Friend List fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "친구 목록 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 받은 친구 신청 목록 조회
    const fetchReceivedRequests = useCallback(async (): Promise<FriendRequest[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getReceivedFriendRequests();
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("Friend Requests fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "친구 신청 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 친구 신청 수락/거절
    const handleRequestResponse = useCallback(async (requestId: number, isAccepted: boolean): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await respondFriendRequest(requestId, isAccepted);
            if (response.status === 200) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err: any) {
            console.error("Respond Friend Request failed", err);
            const errorMessage = err.response?.data?.message || err.message || "요청 처리에 실패했습니다.";
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 친구 삭제
    const handleDeleteFriend = useCallback(async (friendId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await deleteFriend(friendId);
            if (response.status === 200) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err: any) {
            console.error("Delete Friend failed", err);
            const errorMessage = err.response?.data?.message || err.message || "친구 삭제에 실패했습니다.";
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 차단 해제
    const handleUnblockUser = useCallback(async (blockedId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await unblockUser(blockedId);
            if (response.status === 200) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err: any) {
            console.error("Unblock User failed", err);
            const errorMessage = err.response?.data?.message || err.message || "차단 해제에 실패했습니다.";
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 내 정보 조회
    const fetchMyProfile = useCallback(async (): Promise<any | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await myProfileApi();
            // API 응답 구조가 { data: { ... }, status: ..., message: ... } 인 경우
            if (response && response.data) {
                return response.data;
            }
            // 혹은 response 자체가 데이터인 경우
            return response;
        } catch (err: any) {
            console.error("My Profile fetch failed", err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 유저 검색 (단건 조회)
    const searchUserList = useCallback(async (nickname: string): Promise<SearchedUserData[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await searchUsers(nickname);
            if (response.status === 200 && response.data) {
                // UI에서 배열을 기대하므로 배열로 감싸서 반환
                return [response.data];
            } else {
                // 검색 결과가 없거나 실패 시
                return [];
            }
        } catch (err: any) {
            // 404 Not Found 등 (검색 결과 없음)
            if (err.response?.status === 404) return [];

            console.error("User Search failed", err);
            const errorMessage = err.response?.data?.message || err.message || "유저 검색에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 검색 결과 등에서 사용하는 함수
    const sendRequest = useCallback(async (receiverId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await sendFriendRequest(receiverId);
            if (response.status === 200 || response.status === 201) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "친구 신청 전송에 실패했습니다.";

            // [Already Sent Handling]
            // 이미 보낸 요청(400)인 경우 에러로 처리하지 않고 성공으로 간주하여 UI 업데이트 (버튼 비활성화)
            if (errorMessage.includes("이미 요청을 보냈거나")) {
                console.warn("[useFriend] Request already exists. Treating as success for UI update.");
                return true;
            }

            console.error("Send Friend Request failed", err);
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 차단 목록 조회
    const fetchBlockList = useCallback(async (): Promise<BlockedUserData[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getBlockList();
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("Block List fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "차단 목록 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 보낸 친구 신청 목록 조회
    const fetchSentRequests = useCallback(async (): Promise<SentFriendRequest[] | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getSentFriendRequests();
            if (response.status === 200) {
                return response.data;
            } else {
                setError(response.message);
                return null;
            }
        } catch (err: any) {
            console.error("Sent Requests fetch failed", err);
            const errorMessage = err.response?.data?.message || err.message || "보낸 친구 신청 조회에 실패했습니다.";
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 친구 신청 취소
    const cancelSentRequest = useCallback(async (requestId: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await cancelFriendRequest(requestId);
            if (response.status === 200) {
                return true;
            } else {
                setError(response.message);
                return false;
            }
        } catch (err: any) {
            console.error("Cancel Request failed", err);
            const errorMessage = err.response?.data?.message || err.message || "신청 취소에 실패했습니다.";
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        fetchFriends,
        fetchReceivedRequests,
        fetchSentRequests,
        handleRequestResponse,
        handleDeleteFriend,
        handleUnblockUser,
        fetchMyProfile,
        searchUserList,
        sendRequest,
        cancelSentRequest,
        fetchBlockList,
        isLoading,
        error
    };
};
