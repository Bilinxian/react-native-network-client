// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var WebSocketEvents;
(function (WebSocketEvents) {
  WebSocketEvents["OPEN_EVENT"] = "WebSocketClient-Open";
  WebSocketEvents["CLOSE_EVENT"] = "WebSocketClient-Close";
  WebSocketEvents["ERROR_EVENT"] = "WebSocketClient-Error";
  WebSocketEvents["MESSAGE_EVENT"] = "WebSocketClient-Message";
  WebSocketEvents["READY_STATE_EVENT"] = "WebSocketClient-ReadyState";
})(WebSocketEvents || (WebSocketEvents = {}));
export let WebSocketReadyState;
(function (WebSocketReadyState) {
  WebSocketReadyState[WebSocketReadyState["CONNECTING"] = 0] = "CONNECTING";
  WebSocketReadyState[WebSocketReadyState["OPEN"] = 1] = "OPEN";
  WebSocketReadyState[WebSocketReadyState["CLOSING"] = 2] = "CLOSING";
  WebSocketReadyState[WebSocketReadyState["CLOSED"] = 3] = "CLOSED";
})(WebSocketReadyState || (WebSocketReadyState = {}));
//# sourceMappingURL=NativeWebSocketClient.js.map