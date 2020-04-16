"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectSubmission = void 0;

var _root = require("../root");

var selectSubmission = function selectSubmission(name, state) {
  return (0, _root.selectRoot)(name, state).submission;
};

exports.selectSubmission = selectSubmission;