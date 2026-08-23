import React, { useState, useEffect, useRef } from 'react';
import {
    X, Minus, Send, MessageCircle, ChevronLeft, MoreVertical,
    Search, User, Trash2, LogOut, Smile
} from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Friend } from '@/components/home/FriendList/FriendList';
import { useDm } from '@/hooks/home/useDm';
import { DmRoomData } from '@/api/home/dm/dmTypes';
import { formatKSTTime, formatKSTDate, getKSTTimeComponents } from '@/utils/timezone';

import { useAuthStore } from "@/store/useAuthStore";
import { useDmSocket } from '@/hooks/home/useDmSocket';

interface Message {
    id: number;
    text: string;
    isMe: boolean;
    timestamp: string;
    senderNickname?: string; // 상대방 이름 표시용
}

interface ChatWindowProps {
    initialActiveFriend: Friend | null; // 처음 열릴 때 보여줄 친구 (없으면 목록)
    onClose: () => void;
    onMinimize: () => void;
    toggleRef?: React.RefObject<HTMLDivElement | null>; // 토글 버튼 참조 (외부 클릭 예외 처리용)
}

// 더미 채팅 목록 데이터
const DUMMY_CHATS = [
    { id: 1, name: "김민수", lastMessage: "오늘 워치파티 어땠어?", time: "방금 전", unread: 2, imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: 2, name: "이지은", lastMessage: "다음에 또 봐요!", time: "10분 전", unread: 0, imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 3, name: "박서준", lastMessage: "사진을 보냈습니다.", time: "1시간 전", unread: 0, imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
];

// Helper to format date (GMT+9)
const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const { year: y1, month: m1, date: d1 } = getKSTTimeComponents(dateString);
    const { year: y2, month: m2, date: d2 } = getKSTTimeComponents(new Date());

    const isToday = y1 === y2 && m1 === m2 && d1 === d2;

    if (isToday) {
        return formatKSTTime(dateString);
    } else {
        return formatKSTDate(dateString); // Returns YYYY. MM. DD.
    }
};

// Helper to render message with clickable links
const renderMessageWithLinks = (text: string) => {
    // Regex to detect URLs (http, https, www)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

    // Split the text by the regex
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            // Ensure URL starts with http:// or https:// for href
            const href = part.startsWith('www.') ? `http://${part}` : part;
            return (
                <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-all" // break-all handles long URLs
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

const ChatWindow = ({ initialActiveFriend, onClose, onMinimize, toggleRef }: ChatWindowProps) => {
    // view: 'list' | 'detail'
    const [view, setView] = useState<'list' | 'detail'>(initialActiveFriend ? 'detail' : 'list');
    const [currentFriend, setCurrentFriend] = useState<Friend | null>(initialActiveFriend);

    // API 연동을 위한 상태 및 훅
    const { checkRoom, createRoom, fetchMessages, fetchDmRooms, isLoading, leaveRoom } = useDm();
    const { connected, subscribeToRoom, unsubscribe, sendMessage } = useDmSocket();
    const [currentRoom, setCurrentRoom] = useState<DmRoomData | null>(null);
    const { user: me } = useAuthStore();

    // 목록 뷰 상태
    const [chatList, setChatList] = useState<DmRoomData[]>([]);

    // 목록 조회 함수
    const loadRooms = async () => {
        if (view === 'list') {
            const rooms = await fetchDmRooms();
            if (rooms) {
                setChatList(rooms);
            }
        }
    };

    // 목록 조회 (컴포넌트 열릴 때 or view='list'일 때)
    useEffect(() => {
        loadRooms();
    }, [view, fetchDmRooms]); // Dependency updated

    // WebSocket 구독 관리 (connected 상태 & currentRoom 변경 시)
    useEffect(() => {
        if (connected && currentRoom) {
            subscribeToRoom(currentRoom.roomId, (newMessage) => {
                // 새 메시지 수신 시 처리
                // API 응답 DmMessage -> UI Message 변환
                const myId = me?.userId || me?.data?.userId || me?.id;
                const uiMessage: Message = {
                    id: newMessage.messageId,
                    text: newMessage.message,
                    isMe: newMessage.senderId === myId,
                    timestamp: formatKSTTime(newMessage.createdAt),
                    senderNickname: newMessage.senderNickname
                };

                // 기존 메시지 리스트에 추가 (UI 상 최신 메시지는 맨 아래)
                setMessages(prev => [...prev, uiMessage]);
            });
        }

        return () => {
            unsubscribe();
        };
    }, [connected, currentRoom, subscribeToRoom, unsubscribe, me]);

    // 상세 뷰에서의 메시지 상태 & 페이지네이션 상태
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);


    // 이모지 피커 상태
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji);
        // 이모지 클릭 후 피커를 닫고 싶다면 아래 주석 해제
        // setShowEmoji(false);
    };

    // 친구 선택 시(채팅방 진입) API 호출하여 방 존재 여부 확인 (checkRoom - GET)
    useEffect(() => {
        const fetchRoomAndMessages = async () => {
            if (currentFriend && view === 'detail') {

                if (!currentFriend?.id) {
                    console.error("ChatWindow: Friend ID is missing!", currentFriend);
                    return;
                }

                // 1. 방 존재 여부 확인 (GET)
                const roomData = await checkRoom(currentFriend.id);

                if (roomData) {
                    // 방이 존재함 (참여 중 or 나간 상태)
                    setCurrentRoom(roomData);

                    if (roomData.isLeft) {
                        // 나간 방 -> 빈 메시지함 보여줌 (Rejoin 전까지)

                        setMessages([]);
                        setHasMore(false);
                        setPage(0);
                    } else {
                        // 참여 중인 방 -> 메시지 조회 및 소켓 연결
                        // 2. 메시지 목록 조회 (첫 페이지)
                        const msgResponse = await fetchMessages(roomData.roomId, 0, 20);
                        if (msgResponse && msgResponse.content) {
                            const myId = me?.userId || me?.data?.userId || me?.id;
                            const sortedMessages = msgResponse.content.map(m => ({
                                id: m.messageId,
                                text: m.message,
                                isMe: m.senderId === myId,
                                timestamp: formatKSTTime(m.createdAt),
                                senderNickname: m.senderNickname
                            })).reverse();

                            setMessages(sortedMessages);
                            setHasMore(!msgResponse.last);
                            setPage(msgResponse.pageable.pageNumber);
                        }
                    }
                } else {
                    // 방이 없음 (404) -> 새 대화

                    setCurrentRoom(null);
                    setMessages([]);
                    setPage(0);
                    setHasMore(false);
                }
            }
        };

        fetchRoomAndMessages();
    }, [currentFriend, view]); // checkRoom은 dependency 제외 (hook 함수)

    // 이전에 선택된 친구가 변경되면 상세 뷰로 이동
    useEffect(() => {
        if (initialActiveFriend) {
            setCurrentFriend(initialActiveFriend);
            setView('detail');
        }
    }, [initialActiveFriend]);


    const scrollRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (view === 'detail' && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, view]);

    // 외부 클릭 시 채팅창/이모지 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // 1. 토글 버튼(외부)을 클릭한 경우 -> 무시 (버튼의 onClick이 처리하도록)
            if (toggleRef?.current && toggleRef.current.contains(target)) {
                return;
            }

            // 2. 이모지 피커가 열려있고, 피커 외부를 클릭한 경우 -> 피커 닫기
            if (showEmoji && emojiPickerRef.current && !emojiPickerRef.current.contains(target)) {
                // 단, 이모지 토글 버튼 자체를 클릭한 경우는 예외 (setShowEmoji(!showEmoji)와 충돌 방지)
                // -> 구현상 버튼 내부 클릭은 여기서 걸러내기 힘들 수 있으니,
                //    버튼에 e.stopPropagation()을 쓰는게 더 깔끔하지만,
                //    여기서는 토글 버튼이 chatRef 내부에 있으므로 아래 로직으로 넘어감.
                //    하지만 이모지 피커는 absolute로 떠있어서 chatRef 밖일수도?
                //    현재 구조: ChatWIndow(chatRef) -> Form -> Relative Div -> Button & EmojiPicker(absolute)
                //    EmojiPicker는 ChatRef 내부에 포함됨.

                // 만약 클릭한 곳이 ChatWindow 내부라면?
                if (chatRef.current && chatRef.current.contains(target)) {
                    // 채팅창 내부에서의 클릭 -> 이모지 피커만 닫기 (메시지 입력하거나 다른거 클릭할 때 거슬리니까)
                    // 단, 토글 버튼 클릭은 제외해야함. (Button의 onClick 이 실행되어야 함)
                    // -> Button에 id나 data 속성을 줘서 구별하거나,
                    //    간단히 여기서는 "피커 바깥 & 채팅창 안"이면 피커 닫기.
                    //    근데 토글 버튼도 채팅창 안이라서... 토글 버튼 클릭시 [닫기->열기] or [열기->닫기] 꼬일 수 있음.

                    // 해결책: 이모지 토글 버튼 핸들러에서 stopPropagation을 하거나,
                    // 여기서 토글버튼인지 확인.
                    const isToggleBtn = (target as HTMLElement).closest('.emoji-toggle-btn');
                    if (!isToggleBtn) {
                        setShowEmoji(false);
                    }
                }
            }

            // 3. 채팅창(본인) 내부가 아닌 경우 -> 채팅창 닫기
            if (chatRef.current && !chatRef.current.contains(target)) {
                // 이모지 피커가 채팅창 바깥으로 튀어나가 있는 경우도 고려해야 하나,
                // 현재 css: absolute bottom-10 right-0 ... -> 채팅창 영역 내부에 있음 (overflow-hidden 아님? overflow-hidden이면 잘림)
                // ChatWindow에 overflow-hidden이 있음 Line 292.
                // -> 이모지 피커가 잘릴 수 있음!
                // -> Line 292: overflow-hidden 삭제 필요할 수도.
                // -> 확인: Line 292 className="absolute ... overflow-hidden ..."
                // -> EmojiPicker는 position absolute.
                // -> 만약 overflow-hidden이면 피커가 잘릴 것임.
                // -> 피커가 안잘리려면 overflow-hidden을 제거하거나, 피커를 portal로 띄워야 함.
                // -> 일단 overflow-hidden을 제거하는 방향으로 수정. (아니면 body부분만 overflow-y-auto니까 괜찮을지도? 하지만 rounded-xl 때문에..)

                onClose();
            }
        };

        // 이벤트 리스너 등록
        document.addEventListener("mousedown", handleClickOutside);

        // 클린업
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose, showEmoji]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!message.trim()) return;

        let targetRoomId = currentRoom?.roomId;

        // 방이 없거나, 나간 상태라면 -> 방 생성/재진입 (POST)
        if (!currentRoom || currentRoom.isLeft) {
            if (!currentFriend?.id) return;


            const newRoom = await createRoom(currentFriend.id);
            if (newRoom) {
                setCurrentRoom(newRoom);
                targetRoomId = newRoom.roomId;
                // 소켓은 useEffect[currentRoom] 에서 자동 구독됨 (connected && currentRoom)
            } else {
                console.error("Failed to create room.");
                return;
            }
        }

        if (targetRoomId) {
            sendMessage(targetRoomId, message);
            setMessage("");
            setShowEmoji(false); // 메시지 전송 후 이모지 닫기
        }
    };

    const handleBackToList = () => {
        setView('list');
        setCurrentFriend(null);
        setCurrentRoom(null); // 방 정보 초기화
        setMessages([]); // 메시지 초기화
        setPage(0);
        setShowEmoji(false);
    };

    const handleSelectChat = (room: DmRoomData) => {
        // 목록에서 선택 시 바로 currentFriend 설정 및 뷰 전환
        const friendObj: Friend = {
            id: room.targetUser.userId,
            name: room.targetUser.nickname,
            nickname: room.targetUser.nickname,
            activity: "", // API 정보 부족 (필요 시 수정)
            isOnline: false, // API 정보 부족
            imageUrl: room.targetUser.profileImage || "",
            status: 'friend'
        };
        setCurrentFriend(friendObj);
        setView('detail');
    };

    const handleLeaveRoom = async (roomId: number) => {
        const success = await leaveRoom(roomId);
        if (success) {
            if (currentRoom?.roomId === roomId) {
                // If the current active chat is the one being left
                setCurrentFriend(null);
                setCurrentRoom(null);
                setMessages([]);
                setPage(0);
                setHasMore(false);
                setView('list'); // Go back to the list view
            }
            loadRooms(); // Refresh the chat list
        }
    };

    return (
        <div ref={chatRef} className="absolute top-16 right-0 w-[420px] h-[600px] bg-zinc-900 rounded-xl shadow-2xl flex flex-col z-[9999] border border-zinc-700 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
            <style>{`
                .red-scrollbar::-webkit-scrollbar { width: 6px; }
                .red-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .red-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
                .red-scrollbar::-webkit-scrollbar-thumb:hover { background: #b91c1c; }
            `}</style>
            {/* Header */}
            <div className="bg-zinc-800 px-4 py-3 flex items-center justify-between shrink-0 border-b border-zinc-700 rounded-t-xl">
                <div className="flex items-center gap-3">
                    {view === 'detail' && (
                        <button onClick={handleBackToList} className="text-zinc-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    {view === 'detail' && currentFriend ? (
                        <div className="flex items-center gap-2">
                            <img src={currentFriend.imageUrl} alt={currentFriend.name} className="w-8 h-8 rounded-full object-cover border border-zinc-600" />
                            <div>
                                <p className="text-white text-sm font-semibold">{currentFriend.name}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white text-base font-bold">메시지</p>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {view === 'detail' && currentRoom && (
                        <button
                            onClick={() => handleLeaveRoom(currentRoom.roomId)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-700/50 rounded-lg transition-colors cursor-pointer"
                            title="채팅방 나가기"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                    <button onClick={onMinimize} className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <Minus className="w-4 h-4" />
                    </button>
                    <button onClick={onClose} className="p-1.5 hover:bg-red-500/20 rounded-lg text-zinc-400 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Body */}
            {view === 'list' ? (
                // --- LIST VIEW ---
                <div className="flex-1 bg-zinc-900 overflow-y-auto rounded-b-xl red-scrollbar">
                    {/* Chat List */}
                    <div className="divide-y divide-zinc-800">
                        {chatList.map(room => (
                            <div
                                key={room.roomId}
                                onClick={() => handleSelectChat(room)}
                                className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={room.targetUser.profileImage || "https://i.pravatar.cc/150?u=default"}
                                        alt={room.targetUser.nickname}
                                        className="w-12 h-12 rounded-full object-cover bg-zinc-700"
                                    />
                                    {/* 안읽음 뱃지는 현재 API 응답에 없음 - 추후 추가 필요하다면 수정 */}
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col min-w-0 mr-2">
                                            <p className="font-semibold text-zinc-200 text-sm mb-0.5">{room.targetUser.nickname}</p>
                                            <p className="text-sm truncate text-zinc-400">
                                                {room.lastMessage || "대화 내용이 없습니다."}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                            <span className="text-xs text-zinc-500 whitespace-nowrap">
                                                {formatDate(room.createdAt)}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLeaveRoom(room.roomId);
                                                }}
                                                className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-zinc-700/50 rounded-lg transition-colors"
                                                title="나가기"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {chatList.length === 0 && (
                            <div className="p-8 text-center text-zinc-500 text-sm">
                                대화 중인 채팅방이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // --- DETAIL VIEW ---
                <>
                    <div ref={scrollRef} className="flex-1 bg-zinc-950 p-4 overflow-y-auto space-y-4 red-scrollbar">
                        {messages.map((msg, index) => {
                            const nextMsg = messages[index + 1];
                            const isLast = index === messages.length - 1;
                            const isTimeDifferent = nextMsg && nextMsg.timestamp !== msg.timestamp;
                            const isSenderDifferent = nextMsg && nextMsg.isMe !== msg.isMe;
                            const showTimestamp = isLast || isTimeDifferent || isSenderDifferent;

                            return (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] space-y-1 ${msg.isMe ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                                        <div className={`px-4 py-2 rounded-2xl text-sm ${msg.isMe
                                            ? 'bg-red-900 text-white rounded-tr-none'
                                            : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                                            }`}>
                                            {renderMessageWithLinks(msg.text)}
                                        </div>
                                        {showTimestamp && (
                                            <span className="text-[10px] text-zinc-500 px-1">{msg.timestamp}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 shrink-0 rounded-b-xl">
                        <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-2 rounded-xl border border-zinc-700 focus-within:border-zinc-600 focus-within:bg-zinc-800 transition-all">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="메시지 입력..."
                                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                            />
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowEmoji(!showEmoji)}
                                    className="emoji-toggle-btn p-1 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <Smile className="w-5 h-5" />
                                </button>
                                {showEmoji && (
                                    <div ref={emojiPickerRef} className="absolute bottom-10 right-0 z-50 shadow-2xl rounded-xl">
                                        <EmojiPicker
                                            onEmojiClick={onEmojiClick}
                                            width={300}
                                            height={400}
                                            theme={Theme.DARK}
                                            searchDisabled={false}
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className={`p-1.5 rounded-lg transition-colors ${message.trim()
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'bg-zinc-700 text-zinc-500'
                                    }`}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default ChatWindow;
