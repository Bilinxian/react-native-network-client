import type { WebSocketClientConfiguration, WebSocketClientErrorEventHandler, WebSocketClientInterface, WebSocketEventHandler, WebSocketReadyState } from "@mattermost/react-native-network-client";
/**
 * Configurable WebSocket client
 */
declare class WebSocketClient implements WebSocketClientInterface {
    url: string;
    readyState: WebSocketReadyState;
    onReadyStateSubscription: EmitterSubscription;
    onWebSocketOpenSubscription?: EmitterSubscription;
    onWebSocketCloseSubscription?: EmitterSubscription;
    onWebSocketErrorSubscription?: EmitterSubscription;
    onWebSocketMessageSubscription?: EmitterSubscription;
    onWebSocketClientErrorSubscription?: EmitterSubscription;
    constructor(url: string);
    open: () => Promise<void>;
    close: () => Promise<void>;
    send: (data: string) => Promise<void>;
    onOpen: (callback: WebSocketEventHandler) => void;
    onClose: (callback: WebSocketEventHandler) => void;
    onError: (callback: WebSocketEventHandler) => void;
    onMessage: (callback: WebSocketEventHandler) => void;
    onClientError: (callback: WebSocketClientErrorEventHandler) => void;
    invalidate: () => Promise<void>;
}
declare function getOrCreateWebSocketClient(url: string, config?: WebSocketClientConfiguration, clientErrorEventHandler?: WebSocketClientErrorEventHandler): Promise<{
    client: WebSocketClient;
    created: boolean;
}>;
export { getOrCreateWebSocketClient };
//# sourceMappingURL=index.d.ts.map