"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submission = submission;

var types = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function submission(config) {
  var initialState = {
    formId: '',
    id: '',
    isActive: false,
    lastUpdated: 0,
    submission: {},
    url: '',
    error: ''
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    // Only proceed for this form.
    if (action.name !== config.name) {
      return state;
    }

    switch (action.type) {
      case types.SUBMISSION_CLEAR_ERROR:
        return _objectSpread({}, state, {
          error: ''
        });

      case types.SUBMISSION_REQUEST:
        return _objectSpread({}, state, {
          formId: action.formId,
          id: action.id,
          url: action.url,
          submission: {},
          isActive: true
        });

      case types.SUBMISSION_SAVE:
        return _objectSpread({}, state, {
          formId: action.formId,
          id: action.id,
          url: action.url || state.url,
          submission: {},
          isActive: true
        });

      case types.SUBMISSION_SUCCESS:
        return _objectSpread({}, state, {
          id: action.submission._id,
          submission: action.submission,
          isActive: false,
          error: ''
        });

      case types.SUBMISSION_FAILURE:
        return _objectSpread({}, state, {
          isActive: false,
          isInvalid: true,
          error: action.error
        });

      case types.SUBMISSION_RESET:
        return initialState;

      default:
        return state;
    }
  };
}