"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eventemitter = _interopRequireDefault(require("eventemitter2"));

var _components = _interopRequireDefault(require("formiojs/components"));

var _Components = _interopRequireDefault(require("formiojs/components/Components"));

var _Form = _interopRequireDefault(require("formiojs/Form"));

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

_Components["default"].setComponents(_components["default"]);

var Form = /*#__PURE__*/function (_Component) {
  _inherits(Form, _Component);

  var _super = _createSuper(Form);

  function Form() {
    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$props = _this.props,
          _this$props$options = _this$props.options,
          options = _this$props$options === void 0 ? {} : _this$props$options,
          src = _this$props.src,
          url = _this$props.url,
          form = _this$props.form;

      if (!options.events) {
        options.events = Form.getDefaultEmitter();
      }

      if (src) {
        _this.instance = new (_this.props.formioform || _Form["default"])(_this.element, src, options);
        _this.createPromise = _this.instance.ready.then(function (formio) {
          _this.formio = formio;
          _this.formio.src = src;
        });
      }

      if (form) {
        _this.instance = new (_this.props.formioform || _Form["default"])(_this.element, form, options);
        _this.createPromise = _this.instance.ready.then(function (formio) {
          _this.formio = formio;
          _this.formio.form = form;

          if (url) {
            _this.formio.url = url;
          }

          return _this.formio;
        });
      }

      _this.initializeFormio();
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.formio !== undefined) {
        _this.formio.destroy(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initializeFormio", function () {
      if (_this.createPromise) {
        _this.instance.onAny(function (event) {
          if (event.startsWith('formio.')) {
            var funcName = "on".concat(event.charAt(7).toUpperCase()).concat(event.slice(8));

            if (_this.props.hasOwnProperty(funcName) && typeof _this.props[funcName] === 'function') {
              var _this$props2;

              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              (_this$props2 = _this.props)[funcName].apply(_this$props2, args);
            }
          }
        });

        _this.createPromise.then(function () {
          if (_this.props.submission) {
            _this.formio.submission = _this.props.submission;
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var _this$props3 = _this.props,
          _this$props3$options = _this$props3.options,
          options = _this$props3$options === void 0 ? {} : _this$props3$options,
          src = _this$props3.src,
          form = _this$props3.form,
          submission = _this$props3.submission;

      if (!options.events) {
        options.events = Form.getDefaultEmitter();
      }

      if (src !== nextProps.src) {
        _this.instance = new (_this.props.formioform || _Form["default"])(_this.element, nextProps.src, options);
        _this.createPromise = _this.instance.ready.then(function (formio) {
          _this.formio = formio;
          _this.formio.src = nextProps.src;
        });

        _this.initializeFormio();
      }

      if (form !== nextProps.form) {
        _this.instance = new (_this.props.formioform || _Form["default"])(_this.element, nextProps.form, options);
        _this.createPromise = _this.instance.ready.then(function (formio) {
          _this.formio = formio;
          _this.formio.form = nextProps.form;
        });

        _this.initializeFormio();
      }

      if (submission !== nextProps.submission && _this.formio) {
        _this.formio.submission = nextProps.submission;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(element) {
          return _this.element = element;
        }
      });
    });

    return _this;
  }

  _createClass(Form, null, [{
    key: "getDefaultEmitter",
    value: function getDefaultEmitter() {
      return new _eventemitter["default"]({
        wildcard: false,
        maxListeners: 0
      });
    }
  }]);

  return Form;
}(_react.Component);

exports["default"] = Form;

_defineProperty(Form, "propTypes", {
  src: _propTypes["default"].string,
  url: _propTypes["default"].string,
  form: _propTypes["default"].object,
  submission: _propTypes["default"].object,
  options: _propTypes["default"].shape({
    readOnly: _propTypes["default"]["boolean"],
    noAlerts: _propTypes["default"]["boolean"],
    i18n: _propTypes["default"].object,
    template: _propTypes["default"].string,
    saveDraft: _propTypes["default"]["boolean"]
  }),
  onPrevPage: _propTypes["default"].func,
  onNextPage: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onCustomEvent: _propTypes["default"].func,
  onComponentChange: _propTypes["default"].func,
  onSubmit: _propTypes["default"].func,
  onSubmitDone: _propTypes["default"].func,
  onFormLoad: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  onRender: _propTypes["default"].func,
  onAttach: _propTypes["default"].func,
  onBuild: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onInitialized: _propTypes["default"].func,
  formioform: _propTypes["default"].any
});