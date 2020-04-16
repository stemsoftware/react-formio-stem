"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Errors = /*#__PURE__*/function (_Component) {
  _inherits(Errors, _Component);

  var _super = _createSuper(Errors);

  function Errors() {
    _classCallCheck(this, Errors);

    return _super.apply(this, arguments);
  }

  _createClass(Errors, [{
    key: "hasErrors",
    value: function hasErrors(error) {
      if (Array.isArray(error)) {
        return error.filter(function (item) {
          return !!item;
        }).length !== 0;
      }

      return !!error;
    }
  }, {
    key: "formatError",
    value: function formatError(error) {
      if (typeof error === 'string') {
        return error;
      }

      if (Array.isArray(error)) {
        return error.map(this.formatError);
      }

      if (error.hasOwnProperty('errors')) {
        return Object.keys(error.errors).map(function (key, index) {
          var item = error.errors[key];
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: index
          }, /*#__PURE__*/_react["default"].createElement("strong", null, item.name, " (", item.path, ")"), " - ", item.message);
        });
      } // If this is a standard error.


      if (error.hasOwnProperty('message')) {
        return error.message;
      } // If this is a joy validation error.


      if (error.hasOwnProperty('name') && error.name === 'ValidationError') {
        return error.details.map(function (item, index) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: index
          }, item.message);
        });
      } // If a conflict error occurs on a form, the form is returned.


      if (error.hasOwnProperty('_id') && error.hasOwnProperty('display')) {
        return 'Another user has saved this form already. Please reload and re-apply your changes.';
      }

      return 'An error occurred. See console logs for details.';
    }
  }, {
    key: "render",
    value: function render() {
      // If there are no errors, don't render anything.
      if (!this.hasErrors(this.props.errors)) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "alert alert-".concat(this.props.type),
        role: "alert"
      }, this.formatError(this.props.errors));
    }
  }]);

  return Errors;
}(_react.Component);

exports["default"] = Errors;

_defineProperty(Errors, "propTypes", {
  errors: _propTypes["default"].any,
  type: _propTypes["default"].string
});

_defineProperty(Errors, "defaultProps", {
  type: 'danger'
});