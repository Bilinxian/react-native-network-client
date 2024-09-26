import type { EventSubscription } from "react-native";
import type { WebSocketClientConfiguration } from "./WebSocketClient";
declare enum WebSocketEvents {
    OPEN_EVENT = "WebSocketClient-Open",
    CLOSE_EVENT = "WebSocketClient-Close",
    ERROR_EVENT = "WebSocketClient-Error",
    MESSAGE_EVENT = "WebSocketClient-Message",
    READY_STATE_EVENT = "WebSocketClient-ReadyState"
}
export declare enum WebSocketReadyState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}
type WebSocketConstants = {
    EVENTS: typeof WebSocketEvents;
    READY_STATE: typeof WebSocketReadyState;
};
export interface NativeWebSocketClient {
    getConstants(): WebSocketConstants;
    ensureClientFor(url: string, config?: WebSocketClientConfiguration): Promise<void>;
    createClientFor(url: string, config?: WebSocketClientConfiguration): Promise<void>;
    connectFor(url: string): Promise<void>;
    disconnectFor(url: string): Promise<void>;
    sendDataFor(url: string, data: string): Promise<void>;
    invalidateClientFor(url: string): Promise<void>;
    addListener(): EventSubscription;
    removeListeners(): void;
}
export {};
//# sourceMappingURL=NativeWebSocketClient.d.ts.map