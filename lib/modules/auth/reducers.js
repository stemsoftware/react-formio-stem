"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var type = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {
  init: false,
  isActive: false,
  user: null,
  authenticated: false,
  submissionAccess: {},
  formAccess: {},
  projectAccess: {},
  roles: {},
  is: {},
  error: ''
};

function mapProjectRolesToUserRoles(projectRoles, userRoles) {
  return Object.entries(projectRoles).reduce(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        role = _ref2[1];

    return _objectSpread({}, result, _defineProperty({}, name, userRoles.includes(role._id)));
  }, {});
}

function getUserRoles(projectRoles) {
  return Object.keys(projectRoles).reduce(function (result, name) {
    return _objectSpread({}, result, _defineProperty({}, name, name === 'anonymous'));
  }, {});
}

var auth = function auth(config) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case type.USER_REQUEST:
        return _objectSpread({}, state, {
          init: true,
          submissionAccess: false,
          isActive: true
        });

      case type.USER_REQUEST_SUCCESS:
        return _objectSpread({}, state, {
          isActive: false,
          user: action.user,
          authenticated: true,
          is: mapProjectRolesToUserRoles(state.roles, action.user.roles),
          error: ''
        });

      case type.USER_REQUEST_FAILURE:
        return _objectSpread({}, state, {
          isActive: false,
          is: getUserRoles(state.roles),
          error: action.error
        });

      case type.USER_LOGOUT:
        return _objectSpread({}, state, {
          user: null,
          isActive: false,
          authenticated: false,
          is: getUserRoles(state.roles),
          error: ''
        });

      case type.USER_SUBMISSION_ACCESS:
        return _objectSpread({}, state, {
          submissionAccess: action.submissionAccess
        });

      case type.USER_FORM_ACCESS:
        return _objectSpread({}, state, {
          formAccess: action.formAccess
        });

      case type.USER_PROJECT_ACCESS:
        return _objectSpread({}, state, {
          projectAccess: action.projectAccess
        });

      case type.USER_ROLES:
        return _objectSpread({}, state, {
          roles: action.roles
        });

      default:
        return state;
    }
  };
};

exports.auth = auth;