import { useRef, useState, useEffect, useCallback } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/store/useAuthStore';
import { DmMessage } from '@/api/home/dm/dmTypes';

interface UseDmSocketReturn {
    connected: boolean;
    subscribeToRoom: (roomId: number, callback: (message: DmMessage) => void) => void;
    unsubscribe: () => void;
    sendMessage: (roomId: number, message: string) => void;
}

export const useDmSocket = (): UseDmSocketReturn => {
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);
    const [connected, setConnected] = useState(false);
    const { accessToken } = useAuthStore();

    // WebSocket URL 생성 (SockJS를 쓰므로 http://.../ws-stomp 형식을 유지해야 함)
    const getBrokerURL = () => {
        // [1] 환경변수 우선
        if (process.env.NEXT_PUBLIC_WS_URL) {
            // SockJS는 http/https를 원함. 만약 wss로 적혀있으면 https로 바꿈
            return process.env.NEXT_PUBLIC_WS_URL.replace(/^wss/, 'https').replace(/^ws/, 'http');
        }

        // [2] API Base URL 기반 유추
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

        // SockJS는 http 프로토콜을 사용하므로 ws 변환 불필요 (그대로 사용)
        let sockJsUrl = baseURL;

        // 혹시 baseURL 끝에 /api 제거 (ws-stomp는 root에 위치한다고 가정)
        if (sockJsUrl.endsWith('/api')) {
            sockJsUrl = sockJsUrl.slice(0, -4);
        }

        if (sockJsUrl.endsWith('/')) {
            sockJsUrl = sockJsUrl.slice(0, -1);
        }

        // 명세상 Endpoint: /ws-stomp
        return `${sockJsUrl}/ws-stomp`;
    };

    useEffect(() => {
        // 클라이언트 초기화 (SockJS 사용)
        const client = new Client({
            // brokerURL 대신 webSocketFactory 사용
            webSocketFactory: () => new SockJS(getBrokerURL()),
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                // console.log("STOMP Connected (via SockJS)");
                setConnected(true);
            },
            onDisconnect: () => {
                // console.log("STOMP Disconnected");
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketError: (event) => {
                console.error('WebSocket Error Event:', event);
            },
        });

        if (accessToken) {
            client.activate();
            clientRef.current = client;
        }

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
                // console.log("STOMP Deactivated");
            }
        };
    }, [accessToken]);

    const subscribeToRoom = useCallback((roomId: number, callback: (message: DmMessage) => void) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.warn("STOMP not connected, cannot subscribe");
            return;
        }

        // 기존 구독이 있다면 해제
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }

        // 새 구독
        // Subscribe: /sub/dm/room/{roomId}
        const subscription = clientRef.current.subscribe(`/sub/dm/room/${roomId}`, (message: IMessage) => {
            if (message.body) {
                const receivedMessage: DmMessage = JSON.parse(message.body);
                callback(receivedMessage);
            }
        });

        subscriptionRef.current = subscription;
        // console.log(`Subscribed to /sub/dm/room/${roomId}`);
    }, []);

    const unsubscribe = useCallback(() => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
            // console.log("Unsubscribed data");
        }
    }, []);

    const sendMessage = useCallback((roomId: number, message: string) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.warn("STOMP not connected, cannot send message");
            return;
        }

        // Send: /pub/dm/message
        // Body: { roomId, message }
        const payload = {
            roomId,
            message
        };

        clientRef.current.publish({
            destination: '/pub/dm/message',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify(payload),
        });
        // console.log("Message Sent:", payload);
    }, [accessToken]);

    return {
        connected,
        subscribeToRoom,
        unsubscribe,
        sendMessage
    };
};
