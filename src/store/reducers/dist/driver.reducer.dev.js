"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drivers = drivers;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function drivers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    driverFormShow: false,
    loading: true,
    items: [],
    driverUpdated: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.driverConstants.DRIVER_LOADING:
      return _objectSpread({}, state, {
        loading: !state.loading
      });

    case _constants.driverConstants.DRIVER_GETALL:
      return _objectSpread({}, state, {
        items: action.drivers
      });

    case _constants.driverConstants.DRIVER_FORM_SHOW:
      return _objectSpread({}, state, {
        driverFormShow: !state.driverFormShow
      });

    case _constants.driverConstants.DRIVER_GET:
      return _objectSpread({}, state, {
        driverUpdated: action.driver
      });

    default:
      return state;
  }
}