"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("../store/reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import { createLogger } from 'redux-logger';
//const loggerMiddleware = createLogger();
var store = (0, _redux.createStore)(_reducers["default"], (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk["default"])));
exports.store = store;