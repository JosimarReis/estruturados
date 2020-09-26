"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var carActions = {
  getAll: getAll,
  showForm: showForm,
  carCreate: carCreate,
  carUpdate: carUpdate,
  carRemove: carRemove,
  carGet: carGet
};
exports.carActions = carActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.carConstants.CAR_FORM_SHOW
    });
  };
}

function carGet(id) {
  return function (dispatch) {
    _services.carService.carGet(id).then(function (car) {
      dispatch({
        type: _constants.carConstants.CAR_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.carConstants.CAR_GET,
        car: car
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.carService.carGetAll().then(function (cars) {
      dispatch({
        type: _constants.carConstants.CAR_LOADING,
        loading: true
      });
      dispatch({
        type: _constants.carConstants.CAR_GETALL,
        cars: cars
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function carCreate(car) {
  return function (dispatch) {
    _services.carService.carCreate(car).then(function (car) {
      dispatch({
        type: _constants.carConstants.CAR_CREATE,
        car: car
      });

      _helpers.history.push("/cars");
    }, function (error) {
      return console.log(error);
    });
  };
}

function carUpdate(car) {
  return function (dispatch) {
    _services.carService.carUpdate(car).then(function (car) {
      dispatch({
        type: _constants.carConstants.CAR_UPDATE,
        car: car
      });

      _helpers.history.push("/cars/".concat(car.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function carRemove(car) {
  return function (dispatch) {
    _services.carService.carRemove(car.id).then(function (success) {
      dispatch({
        type: _constants.carConstants.CAR_REMOVE
      });

      _helpers.history.push("/cars/".concat(car.id));
    }, function (error) {
      return console.log(error);
    });
  };
}