"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUploadRequestOptions = exports.validateRequestOptions = exports.validateAPIClientConfiguration = void 0;
var _reactNative = require("react-native");
var z = _interopRequireWildcard(require("zod"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const {
  APIClient: NativeAPIClient
} = _reactNative.NativeModules;
const {
  RETRY_TYPES
} = NativeAPIClient.getConstants();
const SessionConfigurationSchema = z.object({
  allowsCellularAccess: z.boolean().optional(),
  waitsForConnectivity: z.boolean().optional(),
  timeoutIntervalForRequest: z.number().optional(),
  timeoutIntervalForResource: z.number().optional(),
  httpMaximumConnectionsPerHost: z.number().optional(),
  cancelRequestsOnUnauthorized: z.boolean().optional(),
  trustSelfSignedServerCertificate: z.boolean().optional()
});
const RetryPolicyConfigurationSchema = z.object({
  type: z.enum(Object.values(RETRY_TYPES)).optional(),
  retryLimit: z.number().optional(),
  retryInterval: z.number().optional(),
  exponentialBackoffBase: z.number().optional(),
  exponentialBackoffScale: z.number().optional(),
  retryMethods: z.array(z.string()).optional(),
  statusCodes: z.array(z.number()).optional()
});
const RequestAdapterConfigurationSchema = z.object({
  bearerAuthTokenResponseHeader: z.string().optional()
});
const ClientP12ConfigurationSchema = z.object({
  path: z.string(),
  password: z.string().optional()
});
const APIClientConfigurationSchema = z.object({
  headers: z.record(z.string()).optional(),
  sessionConfiguration: SessionConfigurationSchema.optional(),
  retryPolicyConfiguration: RetryPolicyConfigurationSchema.optional(),
  requestAdapterConfiguration: RequestAdapterConfigurationSchema.optional(),
  clientP12Configuration: ClientP12ConfigurationSchema.optional()
});
const RequestOptionsSchema = z.object({
  headers: z.record(z.string()).optional(),
  body: z.union([z.record(z.unknown()), z.array(z.unknown()), z.string()]).optional(),
  timeoutInterval: z.number().optional(),
  retryPolicyConfiguration: RetryPolicyConfigurationSchema.optional()
});
const MultipartUploadConfigSchema = z.object({
  fileKey: z.string().optional(),
  data: z.record(z.string()).optional()
});
const UploadRequestOptionsSchema = RequestOptionsSchema.extend({
  skipBytes: z.number().optional(),
  method: z.string().optional(),
  multipart: MultipartUploadConfigSchema.optional()
});
const validateAPIClientConfiguration = config => {
  const result = APIClientConfigurationSchema.safeParse(config);
  if (!result.success) {
    console.warn(result.error); // eslint-disable-line no-console
  }
};
exports.validateAPIClientConfiguration = validateAPIClientConfiguration;
const validateRequestOptions = options => {
  if (options) {
    const result = RequestOptionsSchema.safeParse(options);
    if (!result.success) {
      console.warn(result.error); // eslint-disable-line no-console
    }
  }
};
exports.validateRequestOptions = validateRequestOptions;
const validateUploadRequestOptions = options => {
  if (options) {
    const result = UploadRequestOptionsSchema.safeParse(options);
    if (!result.success) {
      console.warn(result.error); // eslint-disable-line no-console
    }
  }
};
exports.validateUploadRequestOptions = validateUploadRequestOptions;
//# sourceMappingURL=schemas.js.map