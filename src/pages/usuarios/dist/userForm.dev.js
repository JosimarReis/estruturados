"use strict";

var _reate = _interopRequireDefault(require("reate"));

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validate = function validate(values) {
  var errors = {};

  if (!values.nome) {
    errors.nome = "Requerido";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.login) {
    errors.login = "Requerido";
  }

  return errors;
};