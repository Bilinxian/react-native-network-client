"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetryTypes = exports.APIClientEvents = void 0;
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
let APIClientEvents;
exports.APIClientEvents = APIClientEvents;
(function (APIClientEvents) {
  APIClientEvents["DOWNLOAD_PROGRESS"] = "APIClient-DownloadProgress";
  APIClientEvents["UPLOAD_PROGRESS"] = "APIClient-UploadProgress";
  APIClientEvents["CLIENT_ERROR"] = "APIClient-Error";
})(APIClientEvents || (exports.APIClientEvents = APIClientEvents = {}));
let RetryTypes;
exports.RetryTypes = RetryTypes;
(function (RetryTypes) {
  RetryTypes["EXPONENTIAL_RETRY"] = "exponential";
  RetryTypes["LINEAR_RETRY"] = "linear";
})(RetryTypes || (exports.RetryTypes = RetryTypes = {}));
//# sourceMappingURL=NativeAPIClient.js.map