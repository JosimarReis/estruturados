"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.driverActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var driverActions = {
  getAll: getAll,
  showForm: showForm,
  driverCreate: driverCreate,
  driverUpdate: driverUpdate,
  driverRemove: driverRemove,
  driverGet: driverGet
};
exports.driverActions = driverActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.driverConstants.DRIVER_FORM_SHOW
    });
  };
}

function driverGet(id) {
  return function (dispatch) {
    _services.driverService.driverGet(id).then(function (driver) {
      dispatch({
        type: _constants.driverConstants.DRIVER_LOADING,
        loading: false
      });
      dispatch({
        type: _constants.driverConstants.DRIVER_GET,
        driver: driver
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.driverService.driverGetAll().then(function (drivers) {
      dispatch({
        type: _constants.driverConstants.DRIVER_LOADING,
        loading: false
      });
      dispatch({
        type: _constants.driverConstants.DRIVER_GETALL,
        drivers: drivers
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function driverCreate(driver) {
  return function (dispatch) {
    _services.driverService.driverCreate(driver).then(function (driver) {
      dispatch({
        type: _constants.driverConstants.DRIVER_CREATE,
        driver: driver
      });

      _helpers.history.push("/drivers");
    }, function (error) {
      return console.log(error);
    });
  };
}

function driverUpdate(driver) {
  return function (dispatch) {
    _services.driverService.driverUpdate(driver).then(function (driver) {
      dispatch({
        type: _constants.driverConstants.DRIVER_UPDATE,
        driver: driver
      });

      _helpers.history.push("/drivers/".concat(driver.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function driverRemove(driver) {
  return function (dispatch) {
    _services.driverService.driverRemove(driver.id).then(function (success) {
      dispatch({
        type: _constants.driverConstants.DRIVER_REMOVE
      });

      _helpers.history.push("/drivers/".concat(driver.id));
    }, function (error) {
      return console.log(error);
    });
  };
}