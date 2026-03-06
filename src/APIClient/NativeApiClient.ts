import {type TurboModule, TurboModuleRegistry} from "react-native";
import type {
    Double,
    Int32,
    UnsafeObject,
    WithDefault,
    EventEmitter
} from "react-native/Libraries/Types/CodegenTypes";

type ClientResponseMetrics = {
    networkType: string;
    tlsCipherSuite: string;
    tlsVersion: string;
    httpVersion: string;
    isCached: boolean;
    compressedSize: Double;
    size: Double;
    startTime: Double;
    endTime: Double;
    connectionTime: Double;
    latency: Double;
    speedInMbps: Double;
};

type ClientResponse = Readonly<{
    headers?: UnsafeObject;
    data?: UnsafeObject;
    code: Int32;
    redirectUrls?: string[];
    ok: boolean;
    retriesExhausted?: boolean;
    path?: string;
    metrics?: ClientResponseMetrics;
}>;

export enum RetryTypes {
    EXPONENTIAL_RETRY = "exponential",
    LINEAR_RETRY = "linear",
}

type RetryPolicyConfiguration = Readonly<{
    type?: WithDefault<RetryTypes, "exponential">;
    retryLimit?: Int32;
    retryInterval?: Int32;
    exponentialBackoffBase?: Int32;
    exponentialBackoffScale?: Double;
    statusCodes?: Int32[];
    retryMethods?: string[];
}>;

type ClientHeaders = UnsafeObject;

export type RequestOptions = Readonly<{
    headers?: ClientHeaders;
    body?: UnsafeObject;
    timeoutInterval?: number;
    retryPolicyConfiguration?: RetryPolicyConfiguration;
}>;

type MultipartUploadConfig = Readonly<{
    fileKey?: string;
    data?: UnsafeObject;
}>;

type UploadRequestOptions = RequestOptions &
    Readonly<{
        skipBytes?: Double;
        method?: string;
        multipart?: MultipartUploadConfig;
    }>;

export type SessionConfiguration = {
    allowsCellularAccess?: boolean;
    waitsForConnectivity?: boolean;
    timeoutIntervalForRequest?: Double;
    timeoutIntervalForResource?: Double;
    httpMaximumConnectionsPerHost?: Int32;
    cancelRequestsOnUnauthorized?: boolean;
    trustSelfSignedServerCertificate?: boolean;
};

export type RequestAdapterConfiguration = {
    bearerAuthTokenResponseHeader?: string;
};

export type ClientP12Configuration = Readonly<{
    path: string;
    password?: string;
}>;

export type ApiClientConfiguration = {
    headers?: ClientHeaders;
    sessionConfiguration?: SessionConfiguration;
    retryPolicyConfiguration?: RetryPolicyConfiguration;
    requestAdapterConfiguration?: RequestAdapterConfiguration;
    clientP12Configuration?: ClientP12Configuration;
};

export enum ApiClientEvents {
    DOWNLOAD_PROGRESS = "ApiClient-DownloadProgress",
    UPLOAD_PROGRESS = "ApiClient-UploadProgress",
    CLIENT_ERROR = "ApiClient-Error",
}
export type HeartBeatData = {
    success: boolean,
    exception: string,
    content: string
}
export interface Spec extends TurboModule {
    addListener: (eventType: string) => void;
    removeListeners: (count: Int32) => void;

    headAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    getAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    putAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    postAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    patchAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    methodDeleteAsync(
        baseUrl: string,
        endpoint: string | null,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    uploadAsync(
        baseUrl: string,
        endpoint: string | null,
        fileUrl: string,
        taskId: string,
        options?: UploadRequestOptions,
    ): Promise<ClientResponse>;

    downloadAsync(
        baseUrl: string,
        endpoint: string | null,
        filePath: string,
        taskId: string,
        options?: RequestOptions,
    ): Promise<ClientResponse>;

    cancelRequestAsync(taskId: string): Promise<void>;

    createClientForAsync(
        baseUrl: string,
        config?: ApiClientConfiguration,
    ): Promise<void>;

    getClientHeadersForAsync(baseUrl: string): Promise<ClientHeaders>;

    addClientHeadersForAsync(baseUrl: string, headers: ClientHeaders): Promise<void>;

    importClientP12ForAsync(
        baseUrl: string,
        path: string,
        password?: string,
    ): Promise<void>;

    invalidateClientForAsync(baseUrl: string): Promise<void>;

    setStoreInfo(storeId: string, vendorId: string, access_token: string, host: string, uniqueId: string, version: string, buildNumber: Int32): void

    readonly onHeartBeat: EventEmitter<HeartBeatData>
}

export default TurboModuleRegistry.get<Spec>("ApiClient") as Spec;
