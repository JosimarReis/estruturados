"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxForm = require("redux-form");

var _authentication = require("./authentication.reducer");

var _users = require("./usuarios.reducer");

var _alert = require("./alert.reducer");

var _armchair = require("./armchair.reducer");

var _car = require("./car.reducer");

var _destination = require("./destination.reducer");

var _driver = require("./driver.reducer");

var _passenger = require("./passenger.reducer");

var _travelagent = require("./travelagent.reducer");

var _travelschedule = require("./travelschedule.reducer");

var rootReducer = (0, _redux.combineReducers)({
  form: _reduxForm.reducer,
  authentication: _authentication.authentication,
  users: _users.users,
  alert: _alert.alert,
  armchairs: _armchair.armchairs,
  cars: _car.cars,
  destinations: _destination.destinations,
  drivers: _driver.drivers,
  passengers: _passenger.passengers,
  travelagents: _travelagent.travelagents,
  travelschedules: _travelschedule.travelschedules
});
var _default = rootReducer;
exports["default"] = _default;