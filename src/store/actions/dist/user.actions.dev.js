"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var userActions = {
  login: login,
  logout: logout,
  getAll: getAll,
  showForm: showForm,
  userCreate: userCreate,
  userUpdate: userUpdate,
  userUpdatePass: userUpdatePass,
  userRemove: userRemove,
  userGet: userGet,
  pass: pass,
  formUpload: formUpload,
  submitted: submitted
};
exports.userActions = userActions;

function login(email, senha) {
  return function (dispatch) {
    _services.userService.login(email, senha).then(function (user) {
      dispatch({
        type: _constants.userConstants.USER_LOGIN,
        user: user
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.userConstants.USER_FORM_SHOW
    });
  };
}

function submitted() {
  return function (dispatch) {
    dispatch({
      type: _constants.userConstants.USER_SUBMIT
    });
  };
}

function pass() {
  return function (dispatch) {
    dispatch({
      type: _constants.userConstants.USER_PASS
    });
  };
}

function formUpload() {
  return function (dispatch) {
    dispatch({
      type: _constants.userConstants.USER_FORM_UPLOAD
    });
  };
}

function userGet(user) {
  return function (dispatch) {
    return _services.userService.userGetOne(user).then(function (user) {
      dispatch({
        type: _constants.userConstants.USER_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.userConstants.USER_GET,
        user: user
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function logout() {
  return function (dispatch) {
    _services.userService.logout();

    dispatch({
      type: _constants.userConstants.USER_LOGOUT
    });
  };
}

function getAll() {
  return function (dispatch) {
    return _services.userService.userGetAll().then(function (users) {
      dispatch({
        type: _constants.userConstants.USER_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.userConstants.USER_GETALL,
        users: users
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function userCreate(user) {
  return function (dispatch) {
    dispatch({
      type: _constants.userConstants.USER_FORM_SHOW
    });

    _services.userService.userCreate(user).then(function (user) {
      dispatch({
        type: _constants.userConstants.USER_CREATE,
        user: user
      });

      _helpers.history.push('/usuarios');
    }, function (error) {
      return console.log(error);
    });
  };
}

function userUpdate(user) {
  return function (dispatch) {
    _services.userService.userUpdate(user).then(function (user) {
      dispatch({
        type: _constants.userConstants.USER_UPDATE,
        user: user
      });

      _helpers.history.push('/usuarios');
    }, function (error) {
      return console.log(error);
    });
  };
}

function userUpdatePass(user) {
  return function (dispatch) {
    _services.userService.userUpdatePass(user).then(function (user) {
      dispatch({
        type: _constants.userConstants.USER_UPDATE,
        user: user
      });

      _helpers.history.push('/usuarios');
    }, function (error) {
      return console.log(error);
    });
  };
}

function userRemove(user) {
  return function (dispatch) {
    _services.userService.userRemove(user.id).then(function (success) {
      dispatch({
        type: _constants.userConstants.USER_REMOVE,
        user: user
      });
    }, function (error) {
      return console.log(error);
    });
  };
}