"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Constants: true,
  getOrCreateAPIClient: true,
  getOrCreateWebSocketClient: true
};
exports.default = exports.Constants = void 0;
Object.defineProperty(exports, "getOrCreateAPIClient", {
  enumerable: true,
  get: function () {
    return _APIClient.getOrCreateAPIClient;
  }
});
Object.defineProperty(exports, "getOrCreateWebSocketClient", {
  enumerable: true,
  get: function () {
    return _WebSocketClient.getOrCreateWebSocketClient;
  }
});
var _reactNative = require("react-native");
var _GenericClient = _interopRequireDefault(require("./GenericClient"));
var _APIClient = require("./APIClient");
var _WebSocketClient = require("./WebSocketClient");
var _APIClient2 = require("./types/APIClient");
Object.keys(_APIClient2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _APIClient2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _APIClient2[key];
    }
  });
});
var _NativeAPIClient = require("./types/NativeAPIClient");
Object.keys(_NativeAPIClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NativeAPIClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NativeAPIClient[key];
    }
  });
});
var _NativeGenericClient = require("./types/NativeGenericClient");
Object.keys(_NativeGenericClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NativeGenericClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NativeGenericClient[key];
    }
  });
});
var _NativeWebSocketClient = require("./types/NativeWebSocketClient");
Object.keys(_NativeWebSocketClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _NativeWebSocketClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _NativeWebSocketClient[key];
    }
  });
});
var _WebSocketClient2 = require("./types/WebSocketClient");
Object.keys(_WebSocketClient2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _WebSocketClient2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _WebSocketClient2[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const {
  APIClient: NativeAPIClient
} = _reactNative.NativeModules;
const Constants = NativeAPIClient.getConstants();
exports.Constants = Constants;
var _default = _GenericClient.default;
exports.default = _default;
//# sourceMappingURL=index.js.map