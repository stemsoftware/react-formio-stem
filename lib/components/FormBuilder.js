"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = _interopRequireDefault(require("formiojs/components"));

var _Components = _interopRequireDefault(require("formiojs/components/Components"));

var _FormBuilder = _interopRequireDefault(require("formiojs/FormBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Components["default"].setComponents(_components["default"]);

var FormBuilder = /*#__PURE__*/function (_Component) {
  _inherits(FormBuilder, _Component);

  var _super = _createSuper(FormBuilder);

  function FormBuilder() {
    var _this;

    _classCallCheck(this, FormBuilder);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.initializeBuilder(_this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.builder !== undefined) {
        _this.builder.instance.destroy(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initializeBuilder", function (props) {
      var options = Object.assign({}, props.options);
      var form = Object.assign({}, props.form);
      var Builder = props.Builder;

      if (_this.builder !== undefined) {
        _this.builder.instance.destroy(true);
      }

      _this.builder = new Builder(_this.element.firstChild, form, options);
      _this.builderReady = _this.builder.ready;

      _this.builderReady.then(function () {
        _this.onChange();

        _this.builder.instance.on('saveComponent', _this.emit('onSaveComponent'));

        _this.builder.instance.on('updateComponent', _this.emit('onUpdateComponent'));

        _this.builder.instance.on('removeComponent', _this.emit('onDeleteComponent'));

        _this.builder.instance.on('cancelComponent', _this.emit('onCancelComponent'));

        _this.builder.instance.on('editComponent', _this.emit('onEditComponent'));

        _this.builder.instance.on('addComponent', _this.onChange);

        _this.builder.instance.on('saveComponent', _this.onChange);

        _this.builder.instance.on('updateComponent', _this.onChange);

        _this.builder.instance.on('removeComponent', _this.onChange);

        _this.builder.instance.on('deleteComponent', _this.onChange);

        _this.builder.instance.on('pdfUploaded', _this.onChange);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var _this$props = _this.props,
          options = _this$props.options,
          form = _this$props.form;

      if (form.display !== nextProps.form.display || options !== nextProps.options || form.components !== nextProps.form.components) {
        _this.initializeBuilder(nextProps);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(element) {
          return _this.element = element;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", null));
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function () {
      if (_this.props.hasOwnProperty('onChange') && typeof _this.props.onChange === 'function') {
        _this.props.onChange(_this.builder.instance.form);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "emit", function (funcName) {
      return function () {
        if (_this.props.hasOwnProperty(funcName) && typeof _this.props[funcName] === 'function') {
          var _this$props2;

          (_this$props2 = _this.props)[funcName].apply(_this$props2, arguments);
        }
      };
    });

    return _this;
  }

  return FormBuilder;
}(_react.Component);

exports["default"] = FormBuilder;

_defineProperty(FormBuilder, "defaultProps", {
  options: {},
  Builder: _FormBuilder["default"]
});

_defineProperty(FormBuilder, "propTypes", {
  form: _propTypes["default"].object,
  options: _propTypes["default"].object,
  onSaveComponent: _propTypes["default"].func,
  onUpdateComponent: _propTypes["default"].func,
  onDeleteComponent: _propTypes["default"].func,
  onCancelComponent: _propTypes["default"].func,
  onEditComponent: _propTypes["default"].func,
  Builder: _propTypes["default"].any
});