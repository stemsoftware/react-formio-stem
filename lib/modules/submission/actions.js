"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSubmission = exports.saveSubmission = exports.getSubmission = exports.resetSubmission = exports.clearSubmissionError = void 0;

var _Formio = _interopRequireDefault(require("formiojs/Formio"));

var types = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clearSubmissionError = function clearSubmissionError(name) {
  return {
    type: types.SUBMISSION_CLEAR_ERROR,
    name: name
  };
};

exports.clearSubmissionError = clearSubmissionError;

var requestSubmission = function requestSubmission(name, id, formId, url) {
  return {
    type: types.SUBMISSION_REQUEST,
    name: name,
    id: id,
    formId: formId,
    url: url
  };
};

var sendSubmission = function sendSubmission(name, data) {
  return {
    type: types.SUBMISSION_SAVE,
    name: name
  };
};

var receiveSubmission = function receiveSubmission(name, submission, url) {
  return {
    type: types.SUBMISSION_SUCCESS,
    name: name,
    submission: submission,
    url: url
  };
};

var failSubmission = function failSubmission(name, error) {
  return {
    type: types.SUBMISSION_FAILURE,
    name: name,
    error: error
  };
};

var resetSubmission = function resetSubmission(name) {
  return {
    type: types.SUBMISSION_RESET,
    name: name
  };
};

exports.resetSubmission = resetSubmission;

var getSubmission = function getSubmission(name, id, formId) {
  var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  return function (dispatch, getState) {
    // Check to see if the submission is already loaded.
    if (getState().id === id) {
      return;
    }

    var url = "".concat(_Formio["default"].getProjectUrl(), "/").concat(formId ? "form/".concat(formId) : name, "/submission/").concat(id);
    var formio = new _Formio["default"](url);
    dispatch(requestSubmission(name, id, formId, url));
    formio.loadSubmission().then(function (result) {
      dispatch(receiveSubmission(name, result));
      done(null, result);
    })["catch"](function (error) {
      dispatch(failSubmission(name, error));
      done(error);
    });
  };
};

exports.getSubmission = getSubmission;

var saveSubmission = function saveSubmission(name, data, formId) {
  var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  return function (dispatch) {
    dispatch(sendSubmission(name, data));
    var id = data._id;
    var formio = new _Formio["default"]("".concat(_Formio["default"].getProjectUrl(), "/").concat(formId ? "form/".concat(formId) : name, "/submission").concat(id ? "/".concat(id) : ''));
    formio.saveSubmission(data).then(function (result) {
      var url = "".concat(_Formio["default"].getProjectUrl(), "/").concat(formId ? "form/".concat(formId) : name, "/submission/").concat(result._id);
      dispatch(receiveSubmission(name, result, url));
      done(null, result);
    })["catch"](function (error) {
      dispatch(failSubmission(name, error));
      done(error);
    });
  };
};

exports.saveSubmission = saveSubmission;

var deleteSubmission = function deleteSubmission(name, id, formId) {
  var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  return function (dispatch, getState) {
    var formio = new _Formio["default"]("".concat(_Formio["default"].getProjectUrl(), "/").concat(formId ? "form/".concat(formId) : name, "/submission/").concat(id));
    return formio.deleteSubmission().then(function () {
      dispatch(resetSubmission(name));
      done(null, true);
    })["catch"](function (error) {
      dispatch(failSubmission(name, error));
      done(error);
    });
  };
};

exports.deleteSubmission = deleteSubmission;