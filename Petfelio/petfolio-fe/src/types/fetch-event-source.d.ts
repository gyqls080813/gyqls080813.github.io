declare module '@microsoft/fetch-event-source' {
  export interface EventSourceMessage {
    data: string;
    event: string;
    id: string;
    retry?: number;
  }

  export interface FetchEventSourceInit extends RequestInit {
    onmessage?: (event: EventSourceMessage) => void;
    onclose?: () => void;
    onerror?: (err: any) => number | null | undefined | void;
    onopen?: (response: Response) => Promise<void>;
    openWhenHidden?: boolean;
    fetch?: typeof globalThis.fetch;
  }

  export function fetchEventSource(
    url: string,
    opts: FetchEventSourceInit,
  ): Promise<void>;
}
