"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.travelagentService = void 0;

var _helpers = require("../helpers");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var travelagentService = {
  travelagentGetAll: travelagentGetAll,
  travelagentCreate: travelagentCreate,
  travelagentRemove: travelagentRemove,
  travelagentUpdate: travelagentUpdate,
  travelagentGet: travelagentGet
};
exports.travelagentService = travelagentService;

function travelagentGetAll() {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelagents", requestOptions).then(function (travelagents) {
    return travelagents.data;
  });
}

function travelagentGet(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelagents/".concat(id), requestOptions).then(function (travelagents) {
    return travelagents.data;
  });
}
/**
 * 
 * @param {travelagent} travelagent 
 */


function travelagentCreate(travelagent) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post('/travelagents', _objectSpread({}, travelagent), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {travelagent} travelagent 
 */


function travelagentUpdate(travelagent) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/travelagents/".concat(travelagent.id), _objectSpread({}, travelagent), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {id} id 
 */


function travelagentRemove(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"]["delete"]("/travelagents/".concat(id), requestOptions).then(function (data) {
    return data.data;
  });
}