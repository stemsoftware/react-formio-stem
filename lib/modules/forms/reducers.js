"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forms = forms;

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var types = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function forms(_ref) {
  var name = _ref.name,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 10 : _ref$limit,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? {} : _ref$query,
      _ref$select = _ref.select,
      select = _ref$select === void 0 ? '' : _ref$select,
      _ref$sort = _ref.sort,
      sort = _ref$sort === void 0 ? '' : _ref$sort;
  var initialState = {
    error: '',
    forms: [],
    isActive: false,
    limit: limit,
    pagination: {
      numPages: 0,
      page: 1,
      total: 0
    },
    query: query,
    select: select,
    sort: sort
  };
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    // Only proceed for this forms.
    if (action.name !== name) {
      return state;
    }

    switch (action.type) {
      case types.FORMS_RESET:
        return initialState;

      case types.FORMS_REQUEST:
        return _objectSpread({}, state, {}, (0, _pick2["default"])(action.params, ['limit', 'query', 'select', 'sort']), {
          error: '',
          forms: [],
          isActive: true,
          pagination: _objectSpread({}, state.pagination, {
            page: action.page
          })
        });

      case types.FORMS_SUCCESS:
        {
          var total = action.forms.serverCount;
          return _objectSpread({}, state, {
            forms: action.forms,
            isActive: false,
            pagination: _objectSpread({}, state.pagination, {
              numPages: Math.ceil(total / state.limit),
              total: total
            })
          });
        }

      case types.FORMS_FAILURE:
        return _objectSpread({}, state, {
          error: action.error,
          isActive: false
        });

      default:
        return state;
    }
  };
}