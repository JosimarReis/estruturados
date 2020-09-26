"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxForm = require("redux-form");

var _authentication = require("./authentication.reducer");

var _users = require("./usuarios.reducer");

var _ramos = require("./ramos.reducer");

var _produtos = require("./produtos.reducer");

var _alert = require("./alert.reducer");

var _estabelecimentos = require("./estabelecimentos.reducer");

var _usuarioEstabelecimento = require("./usuarioEstabelecimento.reducer");

var _categorias = require("./categorias.reducer");

var rootReducer = (0, _redux.combineReducers)({
  form: _reduxForm.reducer,
  authentication: _authentication.authentication,
  users: _users.users,
  produtos: _produtos.produtos,
  alert: _alert.alert,
  ramos: _ramos.ramos,
  estabelecimentos: _estabelecimentos.estabelecimentos,
  usuarioEstabelecimento: _usuarioEstabelecimento.usuarioEstabelecimento,
  categorias: _categorias.categorias
});
var _default = rootReducer;
exports["default"] = _default;