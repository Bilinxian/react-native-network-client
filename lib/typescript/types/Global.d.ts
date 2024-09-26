import type { NativeModule as NM, EventEmitter as EE, EmitterSubscription as ES } from "react-native";
declare global {
    interface NativeModule extends NM {
    }
    interface EventEmitter extends EE {
    }
    interface EmitterSubscription extends ES {
    }
}
//# sourceMappingURL=Global.d.ts.map