"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteForm = exports.saveForm = exports.getForm = exports.resetForm = exports.clearFormError = void 0;

var _Formio = _interopRequireDefault(require("formiojs/Formio"));

var types = _interopRequireWildcard(require("./constants"));

var _selectors = require("./selectors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var clearFormError = function clearFormError(name) {
  return {
    type: types.FORM_CLEAR_ERROR,
    name: name
  };
};

exports.clearFormError = clearFormError;

var requestForm = function requestForm(name, id, url) {
  return {
    type: types.FORM_REQUEST,
    name: name,
    id: id,
    url: url
  };
};

var receiveForm = function receiveForm(name, form, url) {
  return {
    type: types.FORM_SUCCESS,
    form: form,
    name: name,
    url: url
  };
};

var failForm = function failForm(name, err) {
  return {
    type: types.FORM_FAILURE,
    error: err,
    name: name
  };
};

var resetForm = function resetForm(name) {
  return {
    type: types.FORM_RESET,
    name: name
  };
};

exports.resetForm = resetForm;

var sendForm = function sendForm(name, form) {
  return {
    type: types.FORM_SAVE,
    form: form,
    name: name
  };
};

var getForm = function getForm(name) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return function (dispatch, getState) {
    // Check to see if the form is already loaded.
    var form = (0, _selectors.selectForm)(name, getState());

    if (form.components && Array.isArray(form.components) && form.components.length && form._id === id) {
      return;
    }

    var path = "".concat(_Formio["default"].getProjectUrl(), "/").concat(id ? "form/".concat(id) : name);
    var formio = new _Formio["default"](path);
    dispatch(requestForm(name, id, path));
    return formio.loadForm().then(function (result) {
      dispatch(receiveForm(name, result));
      done(null, result);
    })["catch"](function (result) {
      dispatch(failForm(name, result));
      done(result);
    });
  };
};

exports.getForm = getForm;

var saveForm = function saveForm(name, form) {
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return function (dispatch) {
    dispatch(sendForm(name, form));
    var id = form._id;
    var path = "".concat(_Formio["default"].getProjectUrl(), "/form").concat(id ? "/".concat(id) : '');
    var formio = new _Formio["default"](path);
    formio.saveForm(form).then(function (result) {
      var url = "".concat(_Formio["default"].getProjectUrl(), "/form/").concat(result._id);
      dispatch(receiveForm(name, result, url));
      done(null, result);
    })["catch"](function (result) {
      dispatch(failForm(name, result));
      done(result);
    });
  };
};

exports.saveForm = saveForm;

var deleteForm = function deleteForm(name, id) {
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return function (dispatch) {
    var path = "".concat(_Formio["default"].getProjectUrl(), "/form/").concat(id);
    var formio = new _Formio["default"](path);
    return formio.deleteForm().then(function () {
      dispatch(resetForm(name));
      done();
    })["catch"](function (result) {
      dispatch(failForm(name, result));
      done(result);
    });
  };
};

exports.deleteForm = deleteForm;