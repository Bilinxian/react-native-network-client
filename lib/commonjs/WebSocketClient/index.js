"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrCreateWebSocketClient = getOrCreateWebSocketClient;
var _reactNative = require("react-native");
var _isURL = _interopRequireDefault(require("validator/es/lib/isURL"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const {
  WebSocketClient: NativeWebSocketClient
} = _reactNative.NativeModules;
const Emitter = new _reactNative.NativeEventEmitter(NativeWebSocketClient);
const {
  EVENTS,
  READY_STATE
} = NativeWebSocketClient.getConstants();
const CLIENTS = {};
const CREATING_CLIENT = {};

/**
 * Configurable WebSocket client
 */
class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.readyState = READY_STATE.CLOSED;
    this.onReadyStateSubscription = Emitter.addListener(EVENTS.READY_STATE_EVENT, event => {
      if (event.url === this.url) {
        this.readyState = event.message;
      }
    });
  }
  open = () => NativeWebSocketClient.connectFor(this.url);
  close = () => {
    this.readyState = READY_STATE.CLOSED;
    return NativeWebSocketClient.disconnectFor(this.url);
  };
  send = data => NativeWebSocketClient.sendDataFor(this.url, data);
  onOpen = callback => {
    if (this.onWebSocketOpenSubscription) {
      this.onWebSocketOpenSubscription.remove();
    }
    this.onWebSocketOpenSubscription = Emitter.addListener(EVENTS.OPEN_EVENT, event => {
      if (event.url === this.url && callback) {
        callback(event);
      }
    });
  };
  onClose = callback => {
    if (this.onWebSocketCloseSubscription) {
      this.onWebSocketCloseSubscription.remove();
    }
    this.onWebSocketCloseSubscription = Emitter.addListener(EVENTS.CLOSE_EVENT, event => {
      if (event.url === this.url && callback) {
        callback(event);
      }
    });
  };
  onError = callback => {
    if (this.onWebSocketErrorSubscription) {
      this.onWebSocketErrorSubscription.remove();
    }
    this.onWebSocketErrorSubscription = Emitter.addListener(EVENTS.ERROR_EVENT, event => {
      if (event.url === this.url && callback) {
        callback(event);
      }
    });
  };
  onMessage = callback => {
    if (this.onWebSocketMessageSubscription) {
      this.onWebSocketMessageSubscription.remove();
    }
    this.onWebSocketMessageSubscription = Emitter.addListener(EVENTS.MESSAGE_EVENT, event => {
      if (event.url === this.url && callback) {
        callback(event);
      }
    });
  };
  onClientError = callback => {
    if (this.onWebSocketClientErrorSubscription) {
      this.onWebSocketClientErrorSubscription.remove();
    }
    this.onWebSocketClientErrorSubscription = Emitter.addListener(EVENTS.ERROR_EVENT, event => {
      if (event.url === this.url) {
        callback(event);
      }
    });
  };
  invalidate = () => {
    var _this$onWebSocketOpen, _this$onWebSocketClos, _this$onWebSocketErro, _this$onWebSocketMess, _this$onWebSocketClie;
    this.onReadyStateSubscription.remove();
    (_this$onWebSocketOpen = this.onWebSocketOpenSubscription) === null || _this$onWebSocketOpen === void 0 ? void 0 : _this$onWebSocketOpen.remove();
    (_this$onWebSocketClos = this.onWebSocketCloseSubscription) === null || _this$onWebSocketClos === void 0 ? void 0 : _this$onWebSocketClos.remove();
    (_this$onWebSocketErro = this.onWebSocketErrorSubscription) === null || _this$onWebSocketErro === void 0 ? void 0 : _this$onWebSocketErro.remove();
    (_this$onWebSocketMess = this.onWebSocketMessageSubscription) === null || _this$onWebSocketMess === void 0 ? void 0 : _this$onWebSocketMess.remove();
    (_this$onWebSocketClie = this.onWebSocketClientErrorSubscription) === null || _this$onWebSocketClie === void 0 ? void 0 : _this$onWebSocketClie.remove();
    delete CLIENTS[this.url];
    return NativeWebSocketClient.invalidateClientFor(this.url);
  };
}
async function getOrCreateWebSocketClient(url) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let clientErrorEventHandler = arguments.length > 2 ? arguments[2] : undefined;
  if (!isValidWebSocketURL(url)) {
    throw new Error(`"${url}" is not a valid WebSocket URL`);
  }
  let created = false;
  let client = CLIENTS[url];
  if (!client) {
    if (CREATING_CLIENT[url]) {
      throw new Error(`Already creating a client for url "${url}"`);
    }
    CREATING_CLIENT[url] = true;
    created = true;
    client = new WebSocketClient(url);
    if (clientErrorEventHandler) {
      client.onClientError(clientErrorEventHandler);
    }
    await NativeWebSocketClient.ensureClientFor(url, config);
    CLIENTS[url] = client;
    delete CREATING_CLIENT[url];
  }
  return {
    client,
    created
  };
}
const isValidWebSocketURL = url => {
  return (0, _isURL.default)(url, {
    protocols: ["ws", "wss"],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true
  });
};
//# sourceMappingURL=index.js.map