"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormBuilder = _interopRequireDefault(require("./FormBuilder"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var FormEdit = /*#__PURE__*/function (_Component) {
  _inherits(FormEdit, _Component);

  var _super = _createSuper(FormEdit);

  function FormEdit(props) {
    var _this;

    _classCallCheck(this, FormEdit);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "formChange", function (form) {
      _this.setState({
        form: _objectSpread({}, _this.state.form, {}, form)
      });
    });

    var _form = props.form;
    _this.state = {
      form: _form ? (0, _cloneDeep2["default"])(_form) : {
        displayLabel: "",
        name: "",
        path: "",
        display: "form",
        type: "form",
        components: []
      }
    };
    return _this;
  }

  _createClass(FormEdit, [{
    key: "saveForm",
    value: function saveForm() {
      if (this.props.saveForm && typeof this.props.saveForm === "function") {
        this.props.saveForm(this.state.form);
      }
    }
  }, {
    key: "deleteForm",
    value: function deleteForm() {
      if (!this.props.newForm) {
        this.props.deleteForm(this.state.form);
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(path, event) {
      var target = event.target;
      var value = target.type === "checkbox" ? target.checked : target.value;
      this.setState(function (prev) {
        var form = (0, _cloneDeep2["default"])(prev.form);
        (0, _set2["default"])(form, path, value); // If setting title, autogenerate name and path as well.

        if (path === "displayLabel" && !form._id) {
          form.name = (0, _camelCase2["default"])(value);
          form.path = (0, _camelCase2["default"])(value).toLowerCase();
        }

        return _objectSpread({}, prev, {
          form: form
        });
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      // Only update if key form info has changed. The builder handles form component changes itself.
      return this.state.form.displayLabel !== nextState.form.displayLabel || this.state.form.name !== nextState.form.name || this.state.form.path !== nextState.form.path || this.state.form.display !== nextState.form.display || this.state.form.type !== nextState.form.type;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var form = this.state.form;
      var saveText = this.props.saveText;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-lg-2 col-md-4 col-sm-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "form-group-title",
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "displayLabel",
        className: "control-label field-required"
      }, "Display Label"), /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        id: "displayLabel",
        placeholder: "Enter display label",
        value: form.displayLabel || "",
        onChange: function onChange(event) {
          return _this2.handleChange("displayLabel", event);
        }
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-lg-2 col-md-4 col-sm-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "form-group-name",
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "name",
        className: "control-label field-required"
      }, "Name"), /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        id: "name",
        placeholder: "Enter the form machine name",
        value: form.name || "",
        onChange: function onChange(event) {
          return _this2.handleChange("name", event);
        }
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-lg-2 col-md-3 col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "form-group-display",
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "name",
        className: "control-label"
      }, "Display as"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("select", {
        className: "form-control",
        name: "form-display",
        id: "form-display",
        value: form.display || "",
        onChange: function onChange(event) {
          return _this2.handleChange("display", event);
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        label: "Form",
        value: "form"
      }, "Form"), /*#__PURE__*/_react["default"].createElement("option", {
        label: "Wizard",
        value: "wizard"
      }, "Wizard"), /*#__PURE__*/_react["default"].createElement("option", {
        label: "PDF",
        value: "pdf"
      }, "PDF"))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-lg-2 col-md-3 col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "form-group-type",
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "form-type",
        className: "control-label"
      }, "Type"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/_react["default"].createElement("select", {
        className: "form-control",
        name: "form-type",
        id: "form-type",
        value: this.state.form.type,
        onChange: function onChange(event) {
          return _this2.handleChange("type", event);
        }
      }, /*#__PURE__*/_react["default"].createElement("option", {
        label: "Form",
        value: "form"
      }, "Form"), /*#__PURE__*/_react["default"].createElement("option", {
        label: "Resource",
        value: "resource"
      }, "Resource"))))), /*#__PURE__*/_react["default"].createElement("div", {
        id: "save-buttons",
        className: "col-lg-4 col-md-5 col-sm-5 save-buttons pull-right d-flex justify-content-end align-items-end"
      }, this.props.newForm === false ? /*#__PURE__*/_react["default"].createElement("div", {
        title: "Delete form",
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "btn btn-danger fas fa-trash py-3",
        onClick: function onClick() {
          return _this2.deleteForm();
        }
      })) : null, /*#__PURE__*/_react["default"].createElement("div", {
        title: "Cancel changes",
        className: "form-group ml-3"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "btn btn-secondary fas fa-ban py-3",
        onClick: function onClick() {
          return _this2.props.handleReset();
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        title: "Save Form",
        className: "form-group ml-3"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "btn btn-primary",
        onClick: function onClick() {
          return _this2.saveForm();
        }
      }, saveText)))), /*#__PURE__*/_react["default"].createElement(_FormBuilder["default"], {
        key: form._id,
        form: form,
        options: this.props.options,
        builder: this.props.builder,
        onChange: this.formChange
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.form && (prevState.form._id !== nextProps.form._id || prevState.form.modified !== nextProps.form.modified)) {
        return {
          form: (0, _cloneDeep2["default"])(nextProps.form)
        };
      }

      return null;
    }
  }]);

  return FormEdit;
}(_react.Component);

exports["default"] = FormEdit;

_defineProperty(FormEdit, "propTypes", {
  form: _propTypes["default"].object.isRequired,
  options: _propTypes["default"].object,
  builder: _propTypes["default"].any,
  onSave: _propTypes["default"].func
});