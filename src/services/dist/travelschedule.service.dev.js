"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.travelscheduleService = void 0;

var _helpers = require("../helpers");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var travelscheduleService = {
  travelscheduleGetAll: travelscheduleGetAll,
  travelscheduleCreate: travelscheduleCreate,
  travelscheduleGetOne: travelscheduleGetOne,
  travelscheduleRemove: travelscheduleRemove,
  travelscheduleUpdate: travelscheduleUpdate
};
exports.travelscheduleService = travelscheduleService;

function travelscheduleGetAll() {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelschedules", requestOptions).then(function (travelschedules) {
    return travelschedules.data;
  });
}

function travelscheduleGetOne(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelschedules/".concat(id), requestOptions).then(function (travelschedules) {
    return travelschedules.data;
  });
}
/**
 * 
 * @param {travelschedule} travelschedule 
 */


function travelscheduleCreate(travelschedule) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post('/travelschedules', _objectSpread({}, travelschedule), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {travelschedule} travelschedule 
 */


function travelscheduleUpdate(travelschedule) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/travelschedules/".concat(travelschedule.id), _objectSpread({}, travelschedule), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {id} id 
 */


function travelscheduleRemove(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"]["delete"]("/travelschedules/".concat(id), requestOptions).then(function (data) {
    return data.data;
  });
}