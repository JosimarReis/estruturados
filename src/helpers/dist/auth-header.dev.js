"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authHeader = authHeader;

function authHeader() {
  var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  // return authorization header with jwt token
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    if (file) return {
      'Authorization': 'Bearer ' + user.token,
      "content-type": "multipart/form-data"
    };
    return {
      'Authorization': 'Bearer ' + user.token
    };
  } else {
    return {};
  }
}