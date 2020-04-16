"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIsActive = exports.selectError = exports.selectRoot = void 0;

var selectRoot = function selectRoot(name, state) {
  return state[name];
};

exports.selectRoot = selectRoot;

var selectError = function selectError(name, state) {
  return selectRoot(name, state).error;
};

exports.selectError = selectError;

var selectIsActive = function selectIsActive(name, state) {
  return selectRoot(name, state).isActive;
};

exports.selectIsActive = selectIsActive;