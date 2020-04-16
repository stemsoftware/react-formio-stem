"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectForms = void 0;

var _root = require("../root");

var selectForms = function selectForms(name, state) {
  return (0, _root.selectRoot)(name, state).forms;
};

exports.selectForms = selectForms;