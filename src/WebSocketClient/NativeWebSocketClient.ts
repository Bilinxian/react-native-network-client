import { type TurboModule, TurboModuleRegistry } from "react-native";
import type {
    Double,
    Int32,
    UnsafeObject,
} from "react-native/Libraries/Types/CodegenTypes";

type ClientP12Configuration = Readonly<{
    path: string;
    password?: string;
}>;

type WebSocketClientConfiguration = Readonly<{
    headers?: UnsafeObject;
    timeoutInterval?: Double;
    enableCompression?: boolean;
    clientP12Configuration?: ClientP12Configuration;
    trustSelfSignedServerCertificate?: boolean;
}>;

export enum WebSocketEvents {
    OPEN_EVENT = "WebSocketClient-Open",
    CLOSE_EVENT = "WebSocketClient-Close",
    ERROR_EVENT = "WebSocketClient-Error",
    MESSAGE_EVENT = "WebSocketClient-Message",
    READY_STATE_EVENT = "WebSocketClient-ReadyState",
}

export enum WebSocketReadyState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
}

export interface Spec extends TurboModule {
    addListener: (eventType: string) => void;
    removeListeners: (count: Int32) => void;

    ensureClientForAsync: (
        url: string,
        config?: WebSocketClientConfiguration,
    ) => Promise<void>;
    createClientForAsync: (
        url: string,
        config?: WebSocketClientConfiguration,
    ) => Promise<void>;
    connectForAsync: (url: string) => Promise<void>;
    disconnectForAsync(url: string): Promise<void>;
    sendDataForAsync(url: string, data: string): Promise<void>;
    invalidateClientForAsync(url: string): Promise<void>;
}

export default TurboModuleRegistry.get<Spec>("WebSocketClient") as Spec;
