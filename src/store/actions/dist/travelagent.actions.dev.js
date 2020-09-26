"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.travelagentActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var travelagentActions = {
  getAll: getAll,
  showForm: showForm,
  travelagentCreate: travelagentCreate,
  travelagentUpdate: travelagentUpdate,
  travelagentRemove: travelagentRemove,
  travelagentGet: travelagentGet
};
exports.travelagentActions = travelagentActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.travelagentConstants.TRAVELAGENT_FORM_SHOW
    });
  };
}

function travelagentGet(id) {
  return function (dispatch) {
    _services.travelagentService.travelagentGet(id).then(function (travelagent) {
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_GET,
        travelagent: travelagent
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.travelagentService.travelagentGetAll().then(function (travelagents) {
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_GETALL,
        travelagents: travelagents
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelagentCreate(travelagent) {
  return function (dispatch) {
    _services.travelagentService.travelagentCreate(travelagent).then(function (travelagent) {
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_CREATE,
        travelagent: travelagent
      });

      _helpers.history.push("/travelagents");
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelagentUpdate(travelagent) {
  return function (dispatch) {
    _services.travelagentService.travelagentUpdate(travelagent).then(function (travelagent) {
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_UPDATE,
        travelagent: travelagent
      });

      _helpers.history.push("/travelagents/".concat(travelagent.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelagentRemove(travelagent) {
  return function (dispatch) {
    _services.travelagentService.travelagentRemove(travelagent.id).then(function (success) {
      dispatch({
        type: _constants.travelagentConstants.TRAVELAGENT_REMOVE
      });

      _helpers.history.push("/travelagents/".concat(travelagent.id));
    }, function (error) {
      return console.log(error);
    });
  };
}