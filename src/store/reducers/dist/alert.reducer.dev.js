"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = alert;

var _constants = require("../constants");

function alert() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };

    case _constants.alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };

    case _constants.alertConstants.CLEAR:
      return {};

    default:
      return state;
  }
}