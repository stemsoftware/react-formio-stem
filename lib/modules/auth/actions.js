"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.setUser = exports.initAuth = void 0;

var _Formio = _interopRequireDefault(require("formiojs/Formio"));

var type = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requestUser = function requestUser() {
  return {
    type: type.USER_REQUEST
  };
};

var receiveUser = function receiveUser(user) {
  return {
    type: type.USER_REQUEST_SUCCESS,
    user: user
  };
};

var failUser = function failUser(error) {
  return {
    type: type.USER_REQUEST_FAILURE,
    error: error
  };
};

var logoutUser = function logoutUser() {
  return {
    type: type.USER_LOGOUT
  };
};

var submissionAccessUser = function submissionAccessUser(submissionAccess) {
  return {
    type: type.USER_SUBMISSION_ACCESS,
    submissionAccess: submissionAccess
  };
};

var formAccessUser = function formAccessUser(formAccess) {
  return {
    type: type.USER_FORM_ACCESS,
    formAccess: formAccess
  };
};

var projectAccessUser = function projectAccessUser(projectAccess) {
  return {
    type: type.USER_PROJECT_ACCESS,
    projectAccess: projectAccess
  };
};

var rolesUser = function rolesUser(roles) {
  return {
    type: type.USER_ROLES,
    roles: roles
  };
};

function transformSubmissionAccess(forms) {
  return Object.values(forms).reduce(function (result, form) {
    return _objectSpread({}, result, _defineProperty({}, form.name, form.submissionAccess.reduce(function (formSubmissionAccess, access) {
      return _objectSpread({}, formSubmissionAccess, _defineProperty({}, access.type, access.roles));
    }, {})));
  }, {});
}

function transformFormAccess(forms) {
  return Object.values(forms).reduce(function (result, form) {
    return _objectSpread({}, result, _defineProperty({}, form.name, form.access.reduce(function (formAccess, access) {
      return _objectSpread({}, formAccess, _defineProperty({}, access.type, access.roles));
    }, {})));
  }, {});
}

function transformProjectAccess(projectAccess) {
  return projectAccess.reduce(function (result, access) {
    return _objectSpread({}, result, _defineProperty({}, access.type, access.roles));
  }, {});
}

var initAuth = function initAuth() {
  return function (dispatch) {
    var projectUrl = _Formio["default"].getProjectUrl();

    dispatch(requestUser());
    Promise.all([_Formio["default"].currentUser(), _Formio["default"].makeStaticRequest("".concat(projectUrl, "/access")).then(function (result) {
      var submissionAccess = transformSubmissionAccess(result.forms);
      var formAccess = transformFormAccess(result.forms);
      dispatch(submissionAccessUser(submissionAccess));
      dispatch(formAccessUser(formAccess));
      dispatch(rolesUser(result.roles));
    })["catch"](function () {}), _Formio["default"].makeStaticRequest(projectUrl).then(function (project) {
      var projectAccess = transformProjectAccess(project.access);
      dispatch(projectAccessUser(projectAccess));
    })["catch"](function () {})]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          user = _ref2[0];

      if (user) {
        dispatch(receiveUser(user));
      } else {
        dispatch(logoutUser());
      }
    })["catch"](function (result) {
      dispatch(failUser(result));
    });
  };
};

exports.initAuth = initAuth;

var setUser = function setUser(user) {
  return function (dispatch) {
    _Formio["default"].setUser(user);

    dispatch(receiveUser(user));
  };
};

exports.setUser = setUser;

var logout = function logout() {
  return function (dispatch) {
    _Formio["default"].logout();

    dispatch(logoutUser());
  };
};

exports.logout = logout;