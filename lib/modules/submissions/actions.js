"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubmissions = exports.resetSubmissions = void 0;

var _Formio = _interopRequireDefault(require("formiojs/Formio"));

var _root = require("../root");

var types = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resetSubmissions = function resetSubmissions(name) {
  return {
    type: types.SUBMISSIONS_RESET,
    name: name
  };
};

exports.resetSubmissions = resetSubmissions;

var requestSubmissions = function requestSubmissions(name, page, params, formId) {
  return {
    type: types.SUBMISSIONS_REQUEST,
    name: name,
    page: page,
    params: params,
    formId: formId
  };
};

var receiveSubmissions = function receiveSubmissions(name, submissions) {
  return {
    type: types.SUBMISSIONS_SUCCESS,
    name: name,
    submissions: submissions
  };
};

var failSubmissions = function failSubmissions(name, error) {
  return {
    type: types.SUBMISSIONS_FAILURE,
    name: name,
    error: error
  };
};

var getSubmissions = function getSubmissions(name) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var formId = arguments.length > 3 ? arguments[3] : undefined;
  var done = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
  return function (dispatch, getState) {
    dispatch(requestSubmissions(name, page, params, formId));

    var _selectRoot = (0, _root.selectRoot)(name, getState()),
        limit = _selectRoot.limit,
        query = _selectRoot.query,
        select = _selectRoot.select,
        sort = _selectRoot.sort;

    var formio = new _Formio["default"]("".concat(_Formio["default"].getProjectUrl(), "/").concat(formId ? "form/".concat(formId) : name, "/submission"));

    var requestParams = _objectSpread({}, query, {}, params); // Ten is the default so if set to 10, don't send.


    if (limit !== 10) {
      requestParams.limit = limit;
    } else {
      delete requestParams.limit;
    }

    if (page !== 1) {
      requestParams.skip = (page - 1) * limit;
    } else {
      delete requestParams.skip;
    }

    if (select) {
      requestParams.select = select;
    } else {
      delete requestParams.select;
    }

    if (sort) {
      requestParams.sort = sort;
    } else {
      delete requestParams.sort;
    }

    return formio.loadSubmissions({
      params: requestParams
    }).then(function (result) {
      dispatch(receiveSubmissions(name, result));
      done(null, result);
    })["catch"](function (error) {
      dispatch(failSubmissions(name, error));
      done(error);
    });
  };
};

exports.getSubmissions = getSubmissions;