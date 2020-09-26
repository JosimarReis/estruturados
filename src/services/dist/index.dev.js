"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _armchair = require("./armchair.service");

Object.keys(_armchair).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _armchair[key];
    }
  });
});

var _car = require("./car.service");

Object.keys(_car).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _car[key];
    }
  });
});

var _destination = require("./destination.service");

Object.keys(_destination).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _destination[key];
    }
  });
});

var _driver = require("./driver.service");

Object.keys(_driver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _driver[key];
    }
  });
});

var _passenger = require("./passenger.service");

Object.keys(_passenger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _passenger[key];
    }
  });
});

var _travelagent = require("./travelagent.service");

Object.keys(_travelagent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _travelagent[key];
    }
  });
});

var _travelschedule = require("./travelschedule.service");

Object.keys(_travelschedule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _travelschedule[key];
    }
  });
});

var _user = require("./user.service");

Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _user[key];
    }
  });
});