// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export let APIClientEvents;
(function (APIClientEvents) {
  APIClientEvents["DOWNLOAD_PROGRESS"] = "APIClient-DownloadProgress";
  APIClientEvents["UPLOAD_PROGRESS"] = "APIClient-UploadProgress";
  APIClientEvents["CLIENT_ERROR"] = "APIClient-Error";
})(APIClientEvents || (APIClientEvents = {}));
export let RetryTypes;
(function (RetryTypes) {
  RetryTypes["EXPONENTIAL_RETRY"] = "exponential";
  RetryTypes["LINEAR_RETRY"] = "linear";
})(RetryTypes || (RetryTypes = {}));
//# sourceMappingURL=NativeAPIClient.js.map