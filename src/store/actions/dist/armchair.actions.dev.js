"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.armchairActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var armchairActions = {
  getAll: getAll,
  showForm: showForm,
  armchairCreate: armchairCreate,
  armchairUpdate: armchairUpdate,
  armchairRemove: armchairRemove,
  armchairGet: armchairGet
};
exports.armchairActions = armchairActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.armchairConstants.ARMCHAIR_FORM_SHOW
    });
  };
}

function armchairGet(id) {
  return function (dispatch) {
    _services.armchairService.armchairGet(id).then(function (armchair) {
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_GET,
        armchair: armchair
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.armchairService.armchairGetAll().then(function (armchairs) {
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_GETALL,
        armchairs: armchairs
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function armchairCreate(armchair) {
  return function (dispatch) {
    _services.armchairService.armchairCreate(armchair).then(function (armchair) {
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_CREATE,
        armchair: armchair
      });

      _helpers.history.push("/travelagents/".concat(armchair.travel_schedule_id, "/armchairs"));
    }, function (error) {
      return console.log(error);
    });
  };
}

function armchairUpdate(armchair) {
  return function (dispatch) {
    _services.armchairService.armchairUpdate(armchair).then(function (armchair) {
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_UPDATE,
        armchair: armchair
      });

      _helpers.history.push("/travelagents/".concat(armchair.travel_schedule_id, "/armchairs/").concat(armchair.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function armchairRemove(armchair) {
  return function (dispatch) {
    _services.armchairService.armchairRemove(armchair.id).then(function (success) {
      dispatch({
        type: _constants.armchairConstants.ARMCHAIR_REMOVE
      });

      _helpers.history.push("/travelagents/".concat(armchair.travel_schedule_id, "/armchairs/").concat(armchair.id));
    }, function (error) {
      return console.log(error);
    });
  };
}