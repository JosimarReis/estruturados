"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destinationActions = void 0;

var _constants = require("../constants");

var _services = require("../../services");

var _helpers = require("../../helpers");

//import { alertActions } from './';
var destinationActions = {
  getAll: getAll,
  showForm: showForm,
  destinationCreate: destinationCreate,
  destinationUpdate: destinationUpdate,
  destinationRemove: destinationRemove,
  destinationGet: destinationGet
};
exports.destinationActions = destinationActions;

function showForm() {
  return function (dispatch) {
    dispatch({
      type: _constants.destinationConstants.DESTINATION_FORM_SHOW
    });
  };
}

function destinationGet(id) {
  return function (dispatch) {
    _services.destinationService.destinationGet(id).then(function (destination) {
      dispatch({
        type: _constants.destinationConstants.DESTINATION_LOADING,
        loading: false
      });
      dispatch({
        type: _constants.destinationConstants.DESTINATION_GET,
        destination: destination
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function getAll() {
  return function (dispatch) {
    _services.destinationService.destinationGetAll().then(function (destinations) {
      dispatch({
        type: _constants.destinationConstants.DESTINATION_LOADING,
        loading: false
      });
      dispatch({
        type: _constants.destinationConstants.DESTINATION_GETALL,
        destinations: destinations
      });
    }, function (error) {
      return console.log(error);
    });
  };
}

function destinationCreate(destination) {
  return function (dispatch) {
    _services.destinationService.destinationCreate(destination).then(function (destination) {
      dispatch({
        type: _constants.destinationConstants.DESTINATION_CREATE,
        destination: destination
      });

      _helpers.history.push("/destinations");
    }, function (error) {
      return console.log(error);
    });
  };
}

function destinationUpdate(destination) {
  return function (dispatch) {
    _services.destinationService.destinationUpdate(destination).then(function (destination) {
      dispatch({
        type: _constants.destinationConstants.DESTINATION_UPDATE,
        destination: destination
      });

      _helpers.history.push("/destinations/".concat(destination.id));
    }, function (error) {
      return console.log(error);
    });
  };
}

function destinationRemove(destination) {
  return function (dispatch) {
    _services.destinationService.destinationRemove(destination.id).then(function (success) {
      dispatch({
        type: _constants.destinationConstants.DESTINATION_REMOVE
      });

      _helpers.history.push("/destinations/".concat(destination.id));
    }, function (error) {
      return console.log(error);
    });
  };
}