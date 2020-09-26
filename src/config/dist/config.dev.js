"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var dominio = function dominio(uri) {
  var ENV = 'dev';
  var local = 'http://localhost:4320';
  var producao = 'http://142.93.114.208:3000'; //let homologacao = 'http://142.93.114.208:3000'

  return ENV === 'dev' ? "".concat(local).concat(uri) : "".concat(producao).concat(uri);
};

var _default = {
  apiUrl: dominio("/")
};
exports["default"] = _default;