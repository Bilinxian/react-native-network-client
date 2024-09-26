import type { GenericClientInterface, ClientResponse, RequestOptions } from "@mattermost/react-native-network-client";
/**
 * Generic client for making requests
 */
declare class GenericClient implements GenericClientInterface {
    head: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
    get: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
    put: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
    post: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
    patch: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
    delete: (url: string, options?: RequestOptions) => Promise<ClientResponse>;
}
declare const _default: GenericClient;
export default _default;
//# sourceMappingURL=index.d.ts.map