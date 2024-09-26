import type { NativeAPIClient } from "./NativeAPIClient";
import type { NativeGenericClient } from "./NativeGenericClient";
import type { NativeWebSocketClient } from "./NativeWebSocketClient";
export * from "react-native";
declare module "react-native" {
    interface NativeModulesStatic {
        APIClient: NativeAPIClient;
        GenericClient: NativeGenericClient;
        WebSocketClient: NativeWebSocketClient;
    }
}
//# sourceMappingURL=ReactNative.d.ts.map