"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectForm = void 0;

var _root = require("../root");

var selectForm = function selectForm(name, state) {
  return (0, _root.selectRoot)(name, state).form;
};

exports.selectForm = selectForm;