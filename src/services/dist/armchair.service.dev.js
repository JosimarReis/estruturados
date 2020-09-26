"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.armchairService = void 0;

var _helpers = require("../helpers");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] !== null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var armchairService = {
  armchairGetAll: armchairGetAll,
  armchairGetOne: armchairGetOne,
  armchairCreate: armchairCreate,
  armchairRemove: armchairRemove,
  armchairUpdate: armchairUpdate
};
exports.armchairService = armchairService;

function armchairGetAll(travel_id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelschedules/".concat(travel_id, "/armchairs"), requestOptions).then(function (armchairs) {
    return armchairs.data;
  });
}

function armchairGetOne(travel_id, id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].get("/travelschedules/".concat(travel_id, "/armchairs/").concat(id), requestOptions).then(function (armchairs) {
    return armchairs.data;
  });
}
/**
 * 
 * @param {armchair} armchair 
 */


function armchairCreate(armchair) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/travelschedules/".concat(armchair.travel_schedule_id, "/armchairs"), _objectSpread({}, armchair), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {armchair} armchair 
 */


function armchairUpdate(armchair) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"].post("/travelschedules/".concat(armchair.travel_schedule_id, "/armchairs/").concat(armchair.id), _objectSpread({}, armchair), requestOptions).then(function (data) {
    return data.data;
  });
}
/**
 * 
 * @param {id} id 
 */


function armchairRemove(travel_id, id) {
  var requestOptions = {
    method: 'GET',
    headers: (0, _helpers.authHeader)()
  };
  return _axios["default"]["delete"]("/travelschedules/".concat(travel_id, "/armchairs/").concat(id), requestOptions).then(function (data) {
    return data.data;
  });
}