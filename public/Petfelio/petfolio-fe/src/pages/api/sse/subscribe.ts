import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * SSE 프록시 API Route
 * 
 * 브라우저(EventSource) → Next.js API Route(여기) → 백엔드 SSE
 * 
 * 이 프록시가 필요한 이유:
 * 1. 네이티브 EventSource는 Authorization 헤더를 설정할 수 없음
 * 2. Nginx 리버스 프록시가 SSE 스트리밍을 버퍼링하여 연결을 끊어버림
 * 3. Next.js API Route는 서버사이드이므로 두 문제를 모두 우회 가능
 */

// Next.js의 기본 body parser를 비활성화하여 스트리밍을 방해하지 않도록 함
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 쿼리 파라미터로 받은 토큰
  const token = req.query.token as string;

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
  // streamPath가 제공되면 해당 경로로 연결, 없으면 기본 알림 구독
  const streamPath = req.query.streamPath as string | undefined;
  const sseUrl = streamPath
    ? `${apiUrl}${streamPath.startsWith('/') ? '' : '/'}${streamPath}`
    : `${apiUrl}/api/v1/notifications/subscribe`;

  // SSE 응답 헤더를 즉시 플러시하여 클라이언트의 onopen이 바로 발동되도록 함
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  // 헤더를 즉시 전송하여 EventSource의 onopen을 트리거
  res.flushHeaders();

  // 연결 유지를 위한 초기 코멘트 전송 (SSE 스펙: 콜론으로 시작하면 코멘트)
  res.write(': connected\n\n');

  try {
    console.log('[SSE Proxy] 백엔드 SSE 연결 시도:', sseUrl);

    // 백엔드 SSE에 Authorization 헤더를 포함하여 연결
    const response = await fetch(sseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      console.error('[SSE Proxy] 백엔드 응답 에러:', response.status);
      res.write(`event: error\ndata: {"error": "Backend returned ${response.status}"}\n\n`);
      res.end();
      return;
    }

    console.log('[SSE Proxy] 백엔드 SSE 연결 성공! 스트림 파이핑 시작');

    if (!response.body) {
      res.write(`event: error\ndata: {"error": "No response body"}\n\n`);
      res.end();
      return;
    }

    // 백엔드 SSE 스트림을 클라이언트로 그대로 파이핑
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // 클라이언트가 연결을 끊으면 백엔드 연결도 정리
    let clientClosed = false;
    req.on('close', () => {
      console.log('[SSE Proxy] 클라이언트 연결 종료, 백엔드 스트림 정리');
      clientClosed = true;
      reader.cancel();
    });

    // 스트림 펌핑
    try {
      while (!clientClosed) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('[SSE Proxy] 백엔드 스트림 종료');
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log('[SSE Proxy] 청크 수신:', chunk.trim().substring(0, 100));

        if (!clientClosed) {
          res.write(chunk);
          // SSE 데이터를 즉시 브라우저로 전달 (Node.js 내부 버퍼링 방지)
          if (typeof (res as any).flush === 'function') {
            (res as any).flush();
          }
        }
      }
    } catch (err) {
      if (!clientClosed) {
        console.log('[SSE Proxy] 스트림 읽기 에러:', err);
      }
    }

    if (!clientClosed) {
      res.end();
    }
  } catch (err) {
    console.error('[SSE Proxy] 백엔드 연결 실패:', err);
    res.write(`event: error\ndata: {"error": "Backend connection failed"}\n\n`);
    res.end();
  }
}
