"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _schemas = require("../schemas");
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const {
  GenericClient: NativeGenericClient
} = _reactNative.NativeModules;
/**
 * Generic client for making requests
 */
class GenericClient {
  head = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.head(url, options);
  };
  get = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.get(url, options);
  };
  put = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.put(url, options);
  };
  post = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.post(url, options);
  };
  patch = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.patch(url, options);
  };
  delete = (url, options) => {
    (0, _schemas.validateRequestOptions)(options);
    return NativeGenericClient.delete(url, options);
  };
}
var _default = new GenericClient();
exports.default = _default;
//# sourceMappingURL=index.js.map