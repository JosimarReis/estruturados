"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.driverService = void 0;

var _helpers = require("../helpers");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var driverService = {
  driverGetAll: driverGetAll,
  driverCreate: driverCreate,
  driverRemove: driverRemove,
  driverUpdate: driverUpdate,
  driverGet: driverGet
};
exports.driverService = driverService;

function driverGetAll() {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/drivers", requestOptions).then(function (drivers) {
    return drivers.data;
  });
}

function driverGet(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/drivers/".concat(id), requestOptions).then(function (drivers) {
    return drivers.data;
  });
}
/**
 * 
 * @param {driver} driver 
 */


function driverCreate(driver) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post('/drivers', _objectSpread({}, driver), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {driver} driver 
 */


function driverUpdate(driver) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/drivers/".concat(driver.id), _objectSpread({}, driver), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {id} id 
 */


function driverRemove(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"]["delete"]("/drivers/".concat(id), requestOptions).then(function (data) {
    return data.data;
  });
}