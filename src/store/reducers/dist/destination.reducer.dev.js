"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destinations = destinations;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function destinations() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    destinationFormShow: false,
    loading: true,
    items: [],
    destinationUpdated: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.destinationConstants.DESTINATION_LOADING:
      return _objectSpread({}, state, {
        loading: !state.loading
      });

    case _constants.destinationConstants.DESTINATION_GETALL:
      return _objectSpread({}, state, {
        items: action.destinations
      });

    case _constants.destinationConstants.DESTINATION_FORM_SHOW:
      return _objectSpread({}, state, {
        destinationFormShow: !state.destinationFormShow
      });

    case _constants.destinationConstants.DESTINATION_GET:
      return _objectSpread({}, state, {
        destinationUpdated: action.destination
      });

    default:
      return state;
  }
}