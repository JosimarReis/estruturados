"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;

var _helpers = require("../helpers");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userService = {
  login: login,
  logout: logout,
  userGetAll: userGetAll,
  userGetOne: userGetOne,
  userCreate: userCreate,
  userRemove: userRemove,
  userUpdate: userUpdate,
  userUpdatePass: userUpdatePass
};
exports.userService = userService;

function login(email, senha) {
  return _axios["default"].post('/auth/authenticate', {
    email: email,
    senha: senha
  }).then(function (data) {
    var user = _objectSpread({}, data.data); // login successful if there's a jwt token in the response


    if (user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function userGetAll() {
  var requestOptions = {
    method: 'GET'
  };
  return _axios["default"].get("/usuarios", requestOptions).then(function (users) {
    return users.data;
  });
}

function userGetOne(id) {
  var requestOptions = {
    method: 'GET'
  };
  return _axios["default"].get("/usuarios/".concat(id), requestOptions).then(function (users) {
    return users.data;
  });
}
/**
 * 
 * @param {User} user 
 */


function userCreate(user) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post('/usuarios', _objectSpread({}, user), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {User} user 
 */


function userUpdate(user) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/usuarios/".concat(user.id), _objectSpread({}, user), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {User} user 
 */


function userUpdatePass(user) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/usuarios/pass/".concat(user.id), _objectSpread({}, user), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {id} id 
 */


function userRemove(id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"]["delete"]("/usuarios/".concat(id), requestOptions).then(function (data) {
    return data.data;
  });
}