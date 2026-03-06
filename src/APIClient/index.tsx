// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {type EmitterSubscription, EventSubscription, NativeEventEmitter} from "react-native";
import isURL from "validator/es/lib/isURL";

import {
    validateAPIClientConfiguration,
    validateRequestOptions,
    validateUploadRequestOptions,
} from "../schemas";

import type {
    APIClientConfiguration,
    APIClientErrorEvent,
    APIClientErrorEventHandler,
    APIClientInterface,
    ClientHeaders,
    ClientResponse,
    ProgressPromise,
    RequestOptions,
    ProgressEvent,
    UploadRequestOptions,
} from "../types/APIClient";

import {
    ApiClientEvents,
    type RequestOptions as NativeRequestOptions,
    type Spec as NativeApiClientSpec,
} from "./NativeApiClient";
import {Int32} from "react-native/Libraries/Types/CodegenTypesNamespace";
import {HeartBeatData} from "./NativeApiClient";

const NativeApiClient: NativeApiClientSpec =
  require("./NativeApiClient").default;
const Emitter = new NativeEventEmitter(NativeApiClient);
const CLIENTS: { [key: string]: APIClient } = {};

const DEFAULT_API_CLIENT_CONFIG: APIClientConfiguration = {
    sessionConfiguration: {
        allowsCellularAccess: true,
        waitsForConnectivity: false,
        httpMaximumConnectionsPerHost: 10,
        cancelRequestsOnUnauthorized: false,
    },
};

const generateTaskId = () =>
  Math.random().toString(36).slice(-10) +
  Math.random().toString(36).slice(-10);

/**
 * Configurable client for consuming a REST API
 */
class APIClient implements APIClientInterface {
    baseUrl: string;
    config: APIClientConfiguration;
    onClientErrorSubscription?: EmitterSubscription;

    constructor(baseUrl: string, config: APIClientConfiguration = {}) {
        this.baseUrl = removeTrailingSlashes(baseUrl);
        this.config = Object.assign({}, DEFAULT_API_CLIENT_CONFIG, config);
        validateAPIClientConfiguration(config);
    }

    onClientError = (callback: APIClientErrorEventHandler) => {
        if (this.onClientErrorSubscription) {
            this.onClientErrorSubscription.remove();
        }

        this.onClientErrorSubscription = Emitter.addListener(
          ApiClientEvents.CLIENT_ERROR,
          (event: APIClientErrorEvent) => {
              if (event.serverUrl === this.baseUrl && callback) {
                  callback(event);
              }
          },
        );
    };

    getHeaders = (): Promise<ClientHeaders> => {
        return NativeApiClient.getClientHeadersForAsync(
          this.baseUrl,
        ) as Promise<ClientHeaders>;
    };
    addHeaders = (headers: ClientHeaders): Promise<void> => {
        this.config.headers = {
            ...(this.config.headers as ClientHeaders),
            ...headers,
        };

        return NativeApiClient.addClientHeadersForAsync(this.baseUrl, headers);
    };
    importClientP12 = (path: string, password?: string): Promise<void> => {
        return NativeApiClient.importClientP12ForAsync(this.baseUrl, path, password);
    };
    invalidate = (): Promise<void> => {
        this.onClientErrorSubscription?.remove();
        delete CLIENTS[this.baseUrl];

        return NativeApiClient.invalidateClientForAsync(this.baseUrl);
    };

    head = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.headAsync(
          this.baseUrl,
          endpoint,
        ) as Promise<ClientResponse>;
    };
    get = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.getAsync(
          this.baseUrl,
          endpoint,
          options as NativeRequestOptions,
        ) as Promise<ClientResponse>;
    };
    put = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.putAsync(
          this.baseUrl,
          endpoint,
          options as NativeRequestOptions,
        ) as Promise<ClientResponse>;
    };
    post = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.postAsync(
          this.baseUrl,
          endpoint,
          options as NativeRequestOptions,
        ) as Promise<ClientResponse>;
    };
    patch = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.patchAsync(
          this.baseUrl,
          endpoint,
          options as NativeRequestOptions,
        ) as Promise<ClientResponse>;
    };
    delete = (
      endpoint: string,
      options?: RequestOptions,
    ): Promise<ClientResponse> => {
        validateRequestOptions(options);
        return NativeApiClient.methodDeleteAsync(
          this.baseUrl,
          endpoint,
          options as NativeRequestOptions,
        ) as Promise<ClientResponse>;
    };
    upload = (
      endpoint: string,
      fileUrl: string,
      options?: UploadRequestOptions,
    ): ProgressPromise<ClientResponse> => {
        validateUploadRequestOptions(options);
        const taskId = generateTaskId();
        const promise: ProgressPromise<ClientResponse> = new Promise(
          (resolve, reject) => {
              const uploadSubscription = Emitter.addListener(
                ApiClientEvents.UPLOAD_PROGRESS,
                (e: ProgressEvent) => {
                    if (e.taskId === taskId && promise.onProgress) {
                        promise.onProgress(
                          e.fractionCompleted,
                          e.bytesRead,
                        );
                    }
                },
              );

              NativeApiClient.uploadAsync(
                this.baseUrl,
                endpoint,
                fileUrl,
                taskId,
                options as NativeRequestOptions,
              )
                .then((response) => resolve(response as ClientResponse))
                .catch((error: unknown) => reject(error))
                .finally(() => {
                    uploadSubscription.remove();
                    delete promise.progress;
                });
          },
        );

        promise.progress = (fn) => {
            promise.onProgress = fn;
            return promise;
        };

        promise.cancel = () => NativeApiClient.cancelRequestAsync(taskId);

        return promise;
    };
    download = (
      endpoint: string,
      filePath: string,
      options?: RequestOptions,
    ): ProgressPromise<ClientResponse> => {
        validateRequestOptions(options);
        const taskId = generateTaskId();
        const promise: ProgressPromise<ClientResponse> = new Promise(
          (resolve, reject) => {
              const downloadSubscription = Emitter.addListener(
                ApiClientEvents.DOWNLOAD_PROGRESS,
                (e: ProgressEvent) => {
                    if (e.taskId === taskId && promise.onProgress) {
                        promise.onProgress(
                          e.fractionCompleted,
                          e.bytesRead,
                        );
                    }
                },
              );

              NativeApiClient.downloadAsync(
                this.baseUrl,
                endpoint,
                filePath,
                taskId,
                options as NativeRequestOptions,
              )
                .then((response) => resolve(response as ClientResponse))
                .catch((error: unknown) => reject(error))
                .finally(() => {
                    downloadSubscription.remove();
                    delete promise.progress;
                });
          },
        );

        promise.progress = (fn) => {
            promise.onProgress = fn;
            return promise;
        };

        promise.cancel = () => NativeApiClient.cancelRequestAsync(taskId);

        return promise;
    };
}

async function getOrCreateAPIClient(
  baseUrl: string,
  config: APIClientConfiguration = {},
  clientErrorEventHandler?: APIClientErrorEventHandler,
): Promise<{ client: APIClient; created: boolean }> {
    if (!isValidBaseURL(baseUrl)) {
        throw new Error(`"${baseUrl}" is not a valid API base URL`);
    }

    let created = false;
    let client = CLIENTS[baseUrl];
    if (!client) {
        client = new APIClient(baseUrl, config);
        if (clientErrorEventHandler) {
            client.onClientError(clientErrorEventHandler);
        }
        await NativeApiClient.createClientForAsync(client.baseUrl, client.config);
        CLIENTS[baseUrl] = client;
        created = true;
    }

    return {client, created};
}

const isValidBaseURL = (baseUrl: string) => {
    return isURL(baseUrl, {
        protocols: ["http", "https"],
        require_protocol: true,
        require_valid_protocol: true,
        require_host: true,
        require_tld: false,
    });
};

const removeTrailingSlashes = (baseUrl: string) => {
    return baseUrl.replace(/\/+$/, "");
};

let heartBeatEmitter: EventSubscription
const HeartBeat = {
    setStoreInfo(storeId: string, vendorId: string, access_token: string, host: string, uniqueId: string, version: string, buildNumber: Int32) {
        NativeApiClient.setStoreInfo(String(storeId), String(vendorId), String(access_token), String(host), String(uniqueId), String(version), buildNumber)
    },
    addListener(callback: (message: HeartBeatData) => void) {
        if (heartBeatEmitter) {
            heartBeatEmitter.remove()
        }
        heartBeatEmitter = NativeApiClient.onHeartBeat(event => callback(event))
    },
    removeListener() {
        if (heartBeatEmitter) {
            heartBeatEmitter.remove()
        }
    }
}
export {getOrCreateAPIClient, HeartBeat};
