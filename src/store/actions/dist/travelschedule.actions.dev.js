"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.travelscheduleActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var travelscheduleActions = {
  getAll: getAll,
  getOne: getOne,
  showForm: showForm,
  travelscheduleCreate: travelscheduleCreate,
  travelscheduleUpdate: travelscheduleUpdate,
  travelscheduleRemove: travelscheduleRemove,
  travelscheduleGet: travelscheduleGet
};
exports.travelscheduleActions = travelscheduleActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.travelscheduleConstants.TRAVELSCHEDULE_FORM_SHOW
    });
  };
}

function travelscheduleGet(travelschedule) {
  return function (dispatch) {
    dispatch({
      type: _constants.travelscheduleConstants.TRAVELSCHEDULE_GET,
      travelschedule: travelschedule
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.travelscheduleService.travelscheduleGetAll().then(function (travelschedules) {
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_GETALL,
        travelschedules: travelschedules
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getOne(id) {
  return function (dispatch) {
    _services.travelscheduleService.getOne(id).then(function (travelschedules) {
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_GETALL,
        travelschedules: travelschedules
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelscheduleCreate(travelschedule) {
  return function (dispatch) {
    _services.travelscheduleService.travelscheduleCreate(travelschedule).then(function (travelschedule) {
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_CREATE,
        travelschedule: travelschedule
      });

      _helpers.history.push("/travelschedules");
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelscheduleUpdate(travelschedule) {
  return function (dispatch) {
    _services.travelscheduleService.travelscheduleUpdate(travelschedule).then(function (travelschedule) {
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_UPDATE,
        travelschedule: travelschedule
      });

      _helpers.history.push("/travelschedules/".concat(travelschedule.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function travelscheduleRemove(travelschedule) {
  return function (dispatch) {
    _services.travelscheduleService.travelscheduleRemove(travelschedule.id).then(function (success) {
      dispatch({
        type: _constants.travelscheduleConstants.TRAVELSCHEDULE_REMOVE
      });

      _helpers.history.push("/travelschedules/".concat(travelschedule.id));
    }, function (error) {
      return console.log(error);
    });
  };
}