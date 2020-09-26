"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passengerActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var passengerActions = {
  getAll: getAll,
  showForm: showForm,
  passengerCreate: passengerCreate,
  passengerUpdate: passengerUpdate,
  passengerRemove: passengerRemove,
  passengerGet: passengerGet
};
exports.passengerActions = passengerActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.passengerConstants.PASSENGER_FORM_SHOW
    });
  };
}

function passengerGet(id) {
  return function (dispatch) {
    _services.passengerService.passengerGet(id).then(function (passenger) {
      dispatch({
        type: _constants.passengerConstants.PASSENGER_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.passengerConstants.PASSENGER_GET,
        passenger: passenger
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.passengerService.passengerGetAll().then(function (passengers) {
      dispatch({
        type: _constants.passengerConstants.PASSENGER_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.passengerConstants.PASSENGER_GETALL,
        passengers: passengers
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function passengerCreate(passenger) {
  return function (dispatch) {
    _services.passengerService.passengerCreate(passenger).then(function (passenger) {
      dispatch({
        type: _constants.passengerConstants.PASSENGER_CREATE,
        passenger: passenger
      });

      _helpers.history.push("/passengers");
    }, function (error) {
      return console.log(error);
    });
  };
}

function passengerUpdate(passenger) {
  return function (dispatch) {
    _services.passengerService.passengerUpdate(passenger).then(function (passenger) {
      dispatch({
        type: _constants.passengerConstants.PASSENGER_UPDATE,
        passenger: passenger
      });

      _helpers.history.push("/passengers/".concat(passenger.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function passengerRemove(passenger) {
  return function (dispatch) {
    _services.passengerService.passengerRemove(passenger.id).then(function (success) {
      dispatch({
        type: _constants.passengerConstants.PASSENGER_REMOVE
      });

      _helpers.history.push("/passengers/".concat(passenger.id));
    }, function (error) {
      return console.log(error);
    });
  };
}