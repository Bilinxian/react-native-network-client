import { EmitterSubscription } from "react-native";
import type { APIClientConfiguration, APIClientErrorEventHandler, APIClientInterface, ClientHeaders, ClientResponse, ProgressPromise, RequestOptions, UploadRequestOptions } from "@mattermost/react-native-network-client";
/**
 * Configurable client for consuming a REST API
 */
declare class APIClient implements APIClientInterface {
    baseUrl: string;
    config: APIClientConfiguration;
    onClientErrorSubscription?: EmitterSubscription;
    constructor(baseUrl: string, config?: APIClientConfiguration);
    onClientError: (callback: APIClientErrorEventHandler) => void;
    getHeaders: () => Promise<ClientHeaders>;
    addHeaders: (headers: ClientHeaders) => Promise<void>;
    importClientP12: (path: string, password?: string) => Promise<void>;
    invalidate: () => Promise<void>;
    head: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    get: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    put: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    post: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    patch: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    delete: (endpoint: string, options?: RequestOptions) => Promise<ClientResponse>;
    upload: (endpoint: string, fileUrl: string, options?: UploadRequestOptions) => ProgressPromise<ClientResponse>;
    download: (endpoint: string, filePath: string, options?: RequestOptions) => ProgressPromise<ClientResponse>;
}
declare function getOrCreateAPIClient(baseUrl: string, config?: APIClientConfiguration, clientErrorEventHandler?: APIClientErrorEventHandler): Promise<{
    client: APIClient;
    created: boolean;
}>;
export { getOrCreateAPIClient };
//# sourceMappingURL=index.d.ts.map