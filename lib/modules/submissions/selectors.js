"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSubmissions = void 0;

var _root = require("../root");

var selectSubmissions = function selectSubmissions(name, state) {
  return (0, _root.selectRoot)(name, state).submissions;
};

exports.selectSubmissions = selectSubmissions;