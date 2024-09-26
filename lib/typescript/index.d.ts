import GenericClient from "./GenericClient";
import { getOrCreateAPIClient } from "./APIClient";
import { getOrCreateWebSocketClient } from "./WebSocketClient";
declare const Constants: {
    EVENTS: typeof import("./types/NativeAPIClient").APIClientEvents;
    RETRY_TYPES: typeof import("./types/NativeAPIClient").RetryTypes;
};
export * from "./types/APIClient";
export * from "./types/NativeAPIClient";
export * from "./types/NativeGenericClient";
export * from "./types/NativeWebSocketClient";
export * from "./types/WebSocketClient";
export { getOrCreateAPIClient, getOrCreateWebSocketClient, Constants };
export default GenericClient;
//# sourceMappingURL=index.d.ts.map