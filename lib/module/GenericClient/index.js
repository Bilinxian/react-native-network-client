// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { NativeModules } from "react-native";
import { validateRequestOptions } from "../schemas";
const {
  GenericClient: NativeGenericClient
} = NativeModules;
/**
 * Generic client for making requests
 */
class GenericClient {
  head = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.head(url, options);
  };
  get = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.get(url, options);
  };
  put = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.put(url, options);
  };
  post = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.post(url, options);
  };
  patch = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.patch(url, options);
  };
  delete = (url, options) => {
    validateRequestOptions(options);
    return NativeGenericClient.delete(url, options);
  };
}
export default new GenericClient();
//# sourceMappingURL=index.js.map