// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { NativeEventEmitter, NativeModules } from "react-native";
import isURL from "validator/es/lib/isURL";
import { validateAPIClientConfiguration, validateRequestOptions, validateUploadRequestOptions } from "../schemas";
const {
  APIClient: NativeAPIClient
} = NativeModules;
const Emitter = new NativeEventEmitter(NativeAPIClient);
const {
  EVENTS
} = NativeAPIClient.getConstants();
const CLIENTS = {};
const DEFAULT_API_CLIENT_CONFIG = {
  sessionConfiguration: {
    allowsCellularAccess: true,
    waitsForConnectivity: false,
    httpMaximumConnectionsPerHost: 10,
    cancelRequestsOnUnauthorized: false
  }
};
const generateTaskId = () => Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);

/**
 * Configurable client for consuming a REST API
 */
class APIClient {
  constructor(baseUrl) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.baseUrl = removeTrailingSlashes(baseUrl);
    this.config = Object.assign({}, DEFAULT_API_CLIENT_CONFIG, config);
    validateAPIClientConfiguration(config);
  }
  onClientError = callback => {
    if (this.onClientErrorSubscription) {
      this.onClientErrorSubscription.remove();
    }
    this.onClientErrorSubscription = Emitter.addListener(EVENTS.CLIENT_ERROR, event => {
      if (event.serverUrl === this.baseUrl && callback) {
        callback(event);
      }
    });
  };
  getHeaders = () => NativeAPIClient.getClientHeadersFor(this.baseUrl);
  addHeaders = headers => {
    this.config.headers = {
      ...this.config.headers,
      ...headers
    };
    return NativeAPIClient.addClientHeadersFor(this.baseUrl, headers);
  };
  importClientP12 = (path, password) => {
    return NativeAPIClient.importClientP12For(this.baseUrl, path, password);
  };
  invalidate = () => {
    var _this$onClientErrorSu;
    (_this$onClientErrorSu = this.onClientErrorSubscription) === null || _this$onClientErrorSu === void 0 ? void 0 : _this$onClientErrorSu.remove();
    delete CLIENTS[this.baseUrl];
    return NativeAPIClient.invalidateClientFor(this.baseUrl);
  };
  head = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.head(this.baseUrl, endpoint);
  };
  get = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.get(this.baseUrl, endpoint, options);
  };
  put = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.put(this.baseUrl, endpoint, options);
  };
  post = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.post(this.baseUrl, endpoint, options);
  };
  patch = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.patch(this.baseUrl, endpoint, options);
  };
  delete = (endpoint, options) => {
    validateRequestOptions(options);
    return NativeAPIClient.delete(this.baseUrl, endpoint, options);
  };
  upload = (endpoint, fileUrl, options) => {
    validateUploadRequestOptions(options);
    const taskId = generateTaskId();
    const promise = new Promise((resolve, reject) => {
      const uploadSubscription = Emitter.addListener(EVENTS.UPLOAD_PROGRESS, e => {
        if (e.taskId === taskId && promise.onProgress) {
          promise.onProgress(e.fractionCompleted, e.bytesRead);
        }
      });
      NativeAPIClient.upload(this.baseUrl, endpoint, fileUrl, taskId, options).then(response => resolve(response)).catch(error => reject(error)).finally(() => {
        uploadSubscription.remove();
        delete promise.progress;
      });
    });
    promise.progress = fn => {
      promise.onProgress = fn;
      return promise;
    };
    promise.cancel = () => NativeAPIClient.cancelRequest(taskId);
    return promise;
  };
  download = (endpoint, filePath, options) => {
    validateRequestOptions(options);
    const taskId = generateTaskId();
    const promise = new Promise((resolve, reject) => {
      const downloadSubscription = Emitter.addListener(EVENTS.DOWNLOAD_PROGRESS, e => {
        if (e.taskId === taskId && promise.onProgress) {
          promise.onProgress(e.fractionCompleted, e.bytesRead);
        }
      });
      NativeAPIClient.download(this.baseUrl, endpoint, filePath, taskId, options).then(response => resolve(response)).catch(error => reject(error)).finally(() => {
        downloadSubscription.remove();
        delete promise.progress;
      });
    });
    promise.progress = fn => {
      promise.onProgress = fn;
      return promise;
    };
    promise.cancel = () => NativeAPIClient.cancelRequest(taskId);
    return promise;
  };
}
async function getOrCreateAPIClient(baseUrl) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let clientErrorEventHandler = arguments.length > 2 ? arguments[2] : undefined;
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
    await NativeAPIClient.createClientFor(client.baseUrl, client.config);
    CLIENTS[baseUrl] = client;
    created = true;
  }
  return {
    client,
    created
  };
}
const isValidBaseURL = baseUrl => {
  return isURL(baseUrl, {
    protocols: ["http", "https"],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    require_tld: false
  });
};
const removeTrailingSlashes = baseUrl => {
  return baseUrl.replace(/\/+$/, "");
};
export { getOrCreateAPIClient };
//# sourceMappingURL=index.js.map