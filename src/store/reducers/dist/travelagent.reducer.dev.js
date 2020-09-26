"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.travelagents = travelagents;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function travelagents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    travelagentFormShow: false,
    loading: true,
    items: [],
    travelagentUpdated: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.travelagentConstants.TRAVELAGENT_LOADING:
      return _objectSpread({}, state, {
        loading: !state.loading
      });

    case _constants.travelagentConstants.TRAVELAGENT_GETALL:
      return _objectSpread({}, state, {
        items: action.travelagents
      });

    case _constants.travelagentConstants.TRAVELAGENT_FORM_SHOW:
      return _objectSpread({}, state, {
        travelagentFormShow: !state.travelagentFormShow
      });

    case _constants.travelagentConstants.TRAVELAGENT_GET:
      return _objectSpread({}, state, {
        travelagentUpdated: action.travelagent
      });

    default:
      return state;
  }
}