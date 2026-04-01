"use client";

import React, { useState, useMemo } from 'react';
import {
    X, Crown, AlertCircle, User, Settings, LogOut,
    Search, MessageCircle, Trash2, Check, UserPlus, Unlock
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useGuardedNavigation } from '@/hooks/useGuardedNavigation';
import { useLeaveParty } from "@/hooks/home/PartyHooks/useLeaveParty";
import ActivePartyExitModal from '@/components/home/ActivePartyExitModal/ActivePartyExitModal';

import { useFriend } from '@/hooks/home/useFriend';
import { FriendData, SentFriendRequest } from '@/api/home/friend/friendTypes';
import { responseMyProfile } from '@/constants/user/MyProfile';
import { useLogoutMutation } from '@/hooks/auth/Logout';
import { useAuthStore } from '@/store/useAuthStore';

// [데이터 타입 정의] -> API 정의 사용 추천하지만, UI 컴포넌트 편의상 내부 인터페이스 유지하되 매핑 필요.
// 여기서는 Friend 인터페이스를 FriendData와 호환되도록 하거나, 매핑 로직 추가.
export interface Friend {
    id: number;
    name: string;
    nickname: string;
    activity: string;
    isOnline: boolean;
    imageUrl: string;
    status: 'friend' | 'request' | 'blocked';
    isSent?: boolean;
}

interface FriendListProps {
    onClose: () => void;
    onStartChat: (friend: Friend) => void;
}

const FriendList = ({ onClose, onStartChat }: FriendListProps) => {
    const [activeSubTab, setActiveSubTab] = useState<"친구" | "신청" | "차단">("친구");
    const [statusFilter, setStatusFilter] = useState<"online" | "offline">("online");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [sentRequests, setSentRequests] = useState<Set<number>>(new Set()); // 이번 세션에서 보낸 요청 추적
    // UserData 타입 필요 (Friend 인터페이스와 호환성 고려)
    // 여기선 UI 표시용으로 Friend 인터페이스 재사용하거나 별도 state 사용
    // 검색 결과는 UserData[] 이지만, Friend[]로 매핑해서 사용하는 게 편할 듯.
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const [hasSearched, setHasSearched] = useState(false); // 검색 수행 여부

    const { fetchFriends, fetchReceivedRequests, handleRequestResponse, handleDeleteFriend, fetchMyProfile, handleUnblockUser, searchUserList, sendRequest, fetchBlockList, fetchSentRequests, cancelSentRequest, isLoading } = useFriend();
    const router = useRouter();
    const { guardedNavigate, isExitModalOpen, closeModal, pendingDestination, partyIdToLeave } = useGuardedNavigation();
    const { refreshToken, setLogout } = useAuthStore();
    const [isPendingLogout, setIsPendingLogout] = useState(false);
    const { mutate: logoutMutate } = useLogoutMutation();

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        logoutMutate(
            { refreshToken: refreshToken || "" },
            {
                onSuccess: () => {
                    setLogout();
                    router.push("/login");
                },
                onError: (err) => {
                    console.error("로그아웃 실패:", err);
                    alert("로그아웃 중 오류가 발생했습니다.");
                    setIsLogoutModalOpen(false);
                }
            }
        );
    };

    // Profile navigation handler
    const handleProfileClick = () => {
        guardedNavigate('/mypage');
    };



    // 분리된 상태 관리
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [requestList, setRequestList] = useState<Friend[]>([]);
    const [blockedList, setBlockedList] = useState<Friend[]>([]);
    const [sentRequestFullList, setSentRequestFullList] = useState<SentFriendRequest[]>([]);
    const [myProfile, setMyProfile] = useState<any | null>(null);

    // 내 정보 조회
    React.useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchMyProfile();
            if (data) setMyProfile(data);
        };
        loadProfile();
    }, [fetchMyProfile]);

    // 전체 데이터 조회 (수동 갱신 가능하도록 useCallback 사용)
    const refreshAllData = React.useCallback(async () => {
        // 1. 친구 목록
        const friendsData = await fetchFriends();
        if (friendsData) {
            setFriendsList(friendsData.map(f => ({
                id: f.userId,
                name: f.nickname,
                nickname: f.nickname,
                activity: f.status === 'ONLINE' ? "접속 중" : "오프라인",
                isOnline: f.status === 'ONLINE',
                imageUrl: f.profileImageUrl || `/default-profile.png`,
                status: 'friend'
            })));
        }

        // 2. 받은 친구 신청
        const requestsData = await fetchReceivedRequests();
        if (requestsData) {
            setRequestList(requestsData.map(req => ({
                id: req.requestId,
                name: req.requesterNickname,
                nickname: req.requesterNickname,
                activity: "친구 신청을 보냈습니다.",
                isOnline: false,
                imageUrl: req.requesterProfileImageUrl || `/default-profile.png`,
                status: 'request'
            })));
        }

        // 3. 차단 목록
        const blockedData = await fetchBlockList();
        if (blockedData) {
            setBlockedList(blockedData.map(b => ({
                id: b.id,
                name: b.nickname,
                nickname: b.nickname,
                activity: "차단됨",
                isOnline: false,
                imageUrl: b.profileImageUrl || `/default-profile.png`,
                status: 'blocked'
            })));
        } else {
            setBlockedList([]);
        }

        // 4. 보낸 요청 목록 (취소 위해 필요)
        const sentReqs = await fetchSentRequests();
        if (sentReqs) {
            setSentRequestFullList(sentReqs);
            // 기존 세션 Set도 초기화하고 싶다면:
            setSentRequests(new Set(sentReqs.map(r => r.receiverId)));
        }
    }, [fetchFriends, fetchReceivedRequests, fetchBlockList, fetchSentRequests]);

    // 컴포넌트 마운트 시 데이터 로드
    React.useEffect(() => {
        refreshAllData();
    }, [refreshAllData]);

    // --- 기능 핸들러 ---
    const handleAcceptRequest = async (id: number) => {
        const success = await handleRequestResponse(id, true);
        if (success) {
            // 신청 목록에서 제거 -> 친구 목록에 추가 (API 재호출 없이 낙관적 업데이트 or 전체 리로드?)
            // 편의상 여기선 리스트에서만 제거하고 친구 리스트는 리로드 권장되지만, 
            // UX상 바로 추가되는게 좋으므로 친구리스트에도 추가 로직 필요하지만, 
            // 현재 응답값에 친구 정보가 없으면 요청 리스트의 정보를 이용해야 함.
            const target = requestList.find(r => r.id === id);
            setRequestList(prev => prev.filter(f => f.id !== id));
            if (target) {
                setFriendsList(prev => [...prev, { ...target, status: 'friend', activity: '오프라인' }]);
            }
            refreshAllData(); // 전체 데이터 갱신
        }
    };

    const handleDeclineRequest = async (id: number) => {
        const success = await handleRequestResponse(id, false);
        if (success) {
            setRequestList(prev => prev.filter(f => f.id !== id));
            refreshAllData(); // 전체 데이터 갱신
        }
    };

    const handleUnblockUserClick = async (blockedId: number, friendName: string) => {
        const success = await handleUnblockUser(blockedId);
        if (success) {
            setBlockedList(prev => prev.filter(f => f.id !== blockedId));
            refreshAllData(); // 전체 데이터 갱신
        }
    };

    const handleDeleteClick = async (friendId: number, friendName: string) => {
        const success = await handleDeleteFriend(friendId);
        if (success) {
            setFriendsList(prev => prev.filter(f => f.id !== friendId));
            refreshAllData(); // 전체 데이터 갱신
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setHasSearched(true);
        const results = await searchUserList(searchQuery);

        if (results) {
            const mappedResults: Friend[] = results.map(user => {
                const validId = user.userId || (user as any).id;
                if (!validId) console.error("User ID is missing", user);

                return {
                    id: validId,
                    name: user.nickname,
                    nickname: user.nickname,
                    activity: user.isFriend ? "이미 친구입니다" : (user.isFriendRequestSent ? "신청 완료" : ""),
                    isOnline: false,
                    imageUrl: user.profileImage || `/default-profile.png`,
                    status: user.isFriend ? 'friend' : 'request',
                    isSent: user.isFriendRequestSent
                };
            });
            setSearchResults(mappedResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleSendRequest = async (friend: Friend) => {
        if (!friend.id) return;
        if (friend.id === myProfile?.id) {
            alert("자신에게는 친구 신청을 보낼 수 없습니다.");
            return;
        }

        const success = await sendRequest(friend.id);
        if (success) {
            setSentRequests(prev => new Set(prev).add(friend.id));
            setSearchResults(prev => prev.map(p => p.id === friend.id ? { ...p, isSent: true } : p));

            // requestId 확보를 위해 목록 갱신
            const updatedSent = await fetchSentRequests();
            if (updatedSent) setSentRequestFullList(updatedSent);

            refreshAllData(); // 전체 데이터 갱신
        }
    };

    const handleCancelSentRequest = async (friend: Friend) => {
        // requestId 찾기
        // API 응답에서 receiverId가 없고 requesterId가 받는 사람 ID로 오는 경우(백엔드 이슈) 대비
        // friendTypes.ts 주석 참고: requesterId가 실제로는 받는 사람 ID일 수 있음
        let targetReq = sentRequestFullList.find(r => (r.receiverId || r.requesterId) === friend.id);

        // 목록에 없으면(방금 보낸 경우 등) 재조회 시도
        if (!targetReq) {
            const updatedSent = await fetchSentRequests();
            if (updatedSent) {
                setSentRequestFullList(updatedSent);
                targetReq = updatedSent.find(r => (r.receiverId || r.requesterId) === friend.id);
            }
        }

        if (targetReq) {
            const success = await cancelSentRequest(targetReq.requestId);
            if (success) {
                setSentRequests(prev => {
                    const next = new Set(prev);
                    next.delete(friend.id);
                    return next;
                });
                setSearchResults(prev => prev.map(p => p.id === friend.id ? { ...p, isSent: false, activity: "" } : p));
                setSentRequestFullList(prev => prev.filter(r => r.requestId !== targetReq!.requestId));
                refreshAllData(); // 전체 데이터 갱신
            }
        } else {
            console.error("취소할 요청 정보를 찾을 수 없습니다. (ID 매칭 실패)", friend.id, sentRequestFullList);
        }
    };

    // --- 필터링 로직 ---
    const filteredFriends = useMemo(() => {
        let targetList: Friend[] = [];
        if (activeSubTab === "친구") targetList = friendsList;
        else if (activeSubTab === "신청") targetList = requestList;
        else if (activeSubTab === "차단") targetList = blockedList;

        return targetList.filter(friend => {
            const matchesSearch = friend.name.includes(searchQuery);

            if (activeSubTab === "친구") {
                const matchesStatus = statusFilter === "online" ? friend.isOnline : !friend.isOnline;
                return matchesSearch && matchesStatus;
            }
            return matchesSearch;
        });
    }, [friendsList, requestList, blockedList, searchQuery, activeSubTab, statusFilter]);

    const counts = {
        friend: friendsList.length,
        request: requestList.length,
        blocked: blockedList.length,
        online: friendsList.filter(f => f.isOnline).length,
        offline: friendsList.filter(f => !f.isOnline).length,
    };

    return (
        <div className="absolute top-16 right-0 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 ring-1 ring-black/5">

            {/* [고정 영역] 상단 헤더 및 내 정보 */}
            <div className="flex-shrink-0 p-4 border-b border-zinc-700 bg-zinc-800">


                <div className="mb-6 p-4 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                            <img src={myProfile?.profileImageUrl || "/default-profile.png"} className="w-14 h-14 rounded-full object-cover border-2 border-zinc-600" alt="me" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-white truncate">{myProfile?.nickname || "이름 없음"}</p>
                            <p className="text-[11px] text-zinc-400 truncate">{myProfile?.email || "loading..."}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleProfileClick} className="flex-1 px-3 py-2 rounded-lg bg-zinc-700 text-zinc-200 text-xs font-semibold hover:bg-zinc-600 cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm border border-zinc-600">
                            <User className="w-3.5 h-3.5" /> 프로필
                        </button>
                        <button onClick={handleLogoutClick} className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm border border-red-700">
                            <LogOut className="w-3.5 h-3.5" /> 로그아웃
                        </button>
                    </div>
                </div>

                {/* 검색 및 추가 (헤더로 이동됨) */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" onClick={() => isAddingFriend && handleSearch()} style={{ cursor: isAddingFriend ? 'pointer' : 'default' }} />
                        <input type="text"
                            placeholder={isAddingFriend ? "이름으로 친구 찾기..." : "친구 검색..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (isAddingFriend && e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm outline-none transition-all ${isAddingFriend ? "border-red-600/50 focus:border-red-600 ring-0" : "focus:ring-1 focus:ring-red-600 placeholder:text-zinc-500"}`} />
                    </div>
                    <button
                        onClick={() => {
                            if (isAddingFriend) {
                                // 닫기 모드
                                setIsAddingFriend(false);
                                setSearchQuery("");
                                setSearchResults([]);
                                setHasSearched(false);
                            } else {
                                // 열기 모드
                                setIsAddingFriend(true);
                                setSearchQuery(""); // 기존 검색어 초기화
                            }
                        }}
                        className={`px-3 py-2.5 rounded-lg text-white cursor-pointer transition-all flex items-center shadow-sm ${isAddingFriend ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-600 hover:bg-red-700"}`}>
                        {isAddingFriend ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* [스크롤 영역] 리스트 부분 */}
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-zinc-900">
                <div className="p-6 pt-4 space-y-4">
                    {!isAddingFriend ? (
                        <>
                            {/* 소분류 탭 */}
                            <div className="sticky top-0 bg-zinc-900 z-10 flex border-b border-zinc-700 mb-2">
                                {["친구", "신청", "차단"].map((tab) => {
                                    const count = counts[tab === "친구" ? "friend" : tab === "신청" ? "request" : "blocked"];
                                    const isRequestTab = tab === "신청";
                                    const hasRequests = isRequestTab && count > 0;

                                    return (
                                        <button key={tab} onClick={() => {
                                            setActiveSubTab(tab as any);
                                            refreshAllData(); // 탭 변경 시 전체 데이터 갱신
                                        }}
                                            className={`flex-1 py-3 text-sm font-bold cursor-pointer relative transition-all 
                                            ${activeSubTab === tab
                                                    ? (hasRequests ? "text-red-500 border-b-2 border-red-500" : "text-white border-b-2 border-white")
                                                    : (hasRequests ? "text-red-500/70 hover:text-red-500" : "text-zinc-500 hover:text-zinc-300")
                                                }`}>
                                            {tab} <span className={hasRequests ? "text-red-500" : ""}>({count})</span>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* 온/오프 필터 (친구 탭에서만 표시) */}
                            {activeSubTab === "친구" && (
                                <div className="flex gap-2 mb-2">
                                    <button onClick={() => setStatusFilter("online")}
                                        className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === "online" ? "bg-red-900/30 text-red-400 border-2 border-red-700/50" : "bg-zinc-800 text-zinc-500 border-2 border-transparent"}`}>
                                        온라인 ({counts.online})
                                    </button>
                                    <button onClick={() => setStatusFilter("offline")}
                                        className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === "offline" ? "bg-zinc-700 text-zinc-300 border-2 border-zinc-500/50" : "bg-zinc-800 text-zinc-500 border-2 border-transparent"}`}>
                                        오프라인 ({counts.offline})
                                    </button>
                                </div>
                            )}

                            {/* 실제 리스트 출력 */}
                            <div className="space-y-1">
                                {filteredFriends.map((friend) => (
                                    <div key={`friend-${friend.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 group cursor-pointer transition-all">
                                        <div className="relative flex-shrink-0">
                                            <img src={friend.imageUrl} alt={friend.name} className="w-10 h-10 rounded-full object-cover bg-zinc-700" />
                                            {friend.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-zinc-900" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm text-zinc-200 truncate">{friend.name}</p>
                                            <p className="text-[11px] text-zinc-500 truncate">{friend.activity}</p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {friend.status === 'friend' ? (
                                                <>
                                                    <button onClick={() => onStartChat(friend)} className="p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors" title="메시지 보내기">
                                                        <MessageCircle className="w-4 h-4 text-red-500" />
                                                    </button>
                                                    <button onClick={() => handleDeleteClick(friend.id, friend.name)} className="p-1.5 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors" title="친구 삭제">
                                                        <Trash2 className="w-4 h-4 text-zinc-500" />
                                                    </button>
                                                </>
                                            ) : friend.status === 'request' ? (
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleAcceptRequest(friend.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg cursor-pointer text-red-500 transition-colors"><Check className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeclineRequest(friend.id)} className="p-1.5 hover:bg-zinc-500/20 rounded-lg cursor-pointer text-zinc-500 transition-colors"><X className="w-4 h-4" /></button>
                                                </div>
                                            ) : (
                                                <button onClick={() => handleUnblockUserClick(friend.id, friend.name)} className="p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer text-red-500 transition-colors" title="차단 해제">
                                                    <Unlock className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* 친구 추가 모드 */
                        <div className="animate-in fade-in duration-300 space-y-4">
                            {hasSearched ? (
                                searchQuery.trim() === "" ? (
                                    <div className="py-12 text-center text-zinc-500 text-sm">
                                        검색어를 입력해주세요.
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-zinc-500 mb-2">검색 결과</p>
                                        {searchResults.map((user) => (
                                            <div key={`search-${user.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 group transition-all border border-zinc-800">
                                                <div className="relative flex-shrink-0">
                                                    <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover bg-zinc-700" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm text-zinc-200 truncate">{user.name}</p>
                                                    <p className="text-[11px] text-zinc-500 truncate">{user.activity}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const isSent = user.isSent || sentRequests.has(user.id);
                                                        if (isSent) {
                                                            handleCancelSentRequest(user);
                                                        } else {
                                                            handleSendRequest(user);
                                                        }
                                                    }}
                                                    disabled={user.activity === "이미 친구입니다"}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${user.activity === "이미 친구입니다"
                                                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                                        : (user.isSent || sentRequests.has(user.id))
                                                            ? "bg-zinc-800 text-red-500 hover:bg-zinc-700 cursor-pointer border border-red-500/30"
                                                            : "btn-friend-request cursor-pointer"
                                                        }`}
                                                >
                                                    {user.activity === "이미 친구입니다" ? "친구"
                                                        : (user.isSent || sentRequests.has(user.id)) ? <><X className="w-3 h-3" /> 취소</>
                                                            : "친구 신청"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-zinc-500 text-sm">
                                        검색 결과가 없습니다.
                                    </div>
                                )
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                                        <UserPlus className="w-8 h-8 text-zinc-600" />
                                    </div>
                                    <p className="text-sm font-bold text-zinc-300 mb-1">친구 추가</p>
                                    <p className="text-xs text-zinc-500">함께 즐길 친구의 이름을 검색해보세요</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Active Party Exit Modal */}
            {isExitModalOpen && partyIdToLeave && (
                <ActivePartyExitModal
                    partyId={partyIdToLeave}
                    onClose={() => {
                        closeModal();
                        setIsPendingLogout(false);
                    }}
                    redirectPath={pendingDestination || '/home'}
                    onDeleteSuccess={() => {
                    }}
                />
            )}

            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-300">

                        {/* Header */}
                        <div className="px-6 py-4 bg-zinc-800/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-red-600 rounded-full" />
                                <h2 className="text-lg font-black text-white tracking-tight">알림</h2>
                            </div>
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="p-2 bg-zinc-700/50 rounded-xl text-zinc-400 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                                <AlertCircle className="text-red-500" size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">로그아웃</h3>
                                <p className="text-zinc-400">정말 로그아웃 하시겠습니까?</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-black/20 flex gap-3">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="flex-1 py-4 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded-[20px] font-bold transition-all"
                            >
                                취소
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 py-4 bg-red-600 text-white hover:bg-red-700 rounded-[20px] font-bold shadow-lg transition-all"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendList;