"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

var _types = require("../types");

var _utils = require("../utils");

var _Grid = _interopRequireDefault(require("./Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var FormGrid = /*#__PURE__*/function (_React$Component) {
  _inherits(FormGrid, _React$Component);

  var _super = _createSuper(FormGrid);

  function FormGrid() {
    var _this;

    _classCallCheck(this, FormGrid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onSort", function (_ref) {
      var key = _ref.key,
          sort = _ref.sort;

      if ((0, _isFunction2["default"])(sort)) {
        return sort();
      }

      var _this$props = _this.props,
          currentSort = _this$props.forms.sort,
          getForms = _this$props.getForms;
      var sortKey = (0, _isString2["default"])(sort) ? sort : key;
      var ascSort = sortKey;
      var descSort = "-".concat(sortKey);
      var noSort = '';
      var nextSort = noSort;

      if (currentSort === ascSort) {
        nextSort = descSort;
      } else if (currentSort === descSort) {
        nextSort = noSort;
      } else {
        nextSort = ascSort;
      }

      getForms(1, {
        sort: nextSort
      });
    });

    _defineProperty(_assertThisInitialized(_this), "Cell", function (_ref2) {
      var form = _ref2.row,
          column = _ref2.column;
      var _this$props2 = _this.props,
          formAccess = _this$props2.formAccess,
          onAction = _this$props2.onAction,
          _this$props2$operatio = _this$props2.operations,
          operations = _this$props2$operatio === void 0 ? [] : _this$props2$operatio;
      var access = formAccess(form);

      if (column.key === 'title') {
        return /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            cursor: 'pointer'
          },
          onClick: (0, _utils.stopPropagationWrapper)(function () {
            if (access.submission.create) {
              onAction(form, 'view');
            }
          })
        }, /*#__PURE__*/_react["default"].createElement("h5", null, form.title));
      } else if (column.key === 'operations') {
        return /*#__PURE__*/_react["default"].createElement("div", null, operations.map(function (_ref3) {
          var action = _ref3.action,
              _ref3$buttonType = _ref3.buttonType,
              buttonType = _ref3$buttonType === void 0 ? 'primary' : _ref3$buttonType,
              _ref3$icon = _ref3.icon,
              icon = _ref3$icon === void 0 ? '' : _ref3$icon,
              _ref3$permissionsReso = _ref3.permissionsResolver,
              permissionsResolver = _ref3$permissionsReso === void 0 ? function () {
            return true;
          } : _ref3$permissionsReso,
              _ref3$title = _ref3.title,
              title = _ref3$title === void 0 ? '' : _ref3$title;
          return permissionsResolver(form) ? /*#__PURE__*/_react["default"].createElement("span", {
            className: "btn btn-".concat(buttonType, " btn-sm form-btn"),
            onClick: (0, _utils.stopPropagationWrapper)(function () {
              return onAction(form, action);
            }),
            key: action
          }, icon ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
            className: "fa fa-".concat(icon)
          }), "\xA0") : null, title) : null;
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("span", null, (0, _isFunction2["default"])(column.value) ? column.value(form) : (0, _get2["default"])(form, column.key, ''));
    });

    return _this;
  }

  _createClass(FormGrid, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          columns = _this$props3.columns,
          _this$props3$forms = _this$props3.forms,
          forms = _this$props3$forms.forms,
          limit = _this$props3$forms.limit,
          _this$props3$forms$pa = _this$props3$forms.pagination,
          page = _this$props3$forms$pa.page,
          numPages = _this$props3$forms$pa.numPages,
          total = _this$props3$forms$pa.total,
          sort = _this$props3$forms.sort,
          getForms = _this$props3.getForms,
          onAction = _this$props3.onAction,
          onPageSizeChanged = _this$props3.onPageSizeChanged,
          pageSizes = _this$props3.pageSizes;
      var skip = (page - 1) * limit;
      var last = Math.min(skip + limit, total);
      return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        Cell: this.Cell,
        activePage: page,
        columns: columns,
        emptyText: "No forms found",
        firstItem: skip + 1,
        items: forms,
        lastItem: last,
        onAction: onAction,
        onPage: getForms,
        onPageSizeChanged: onPageSizeChanged,
        onSort: this.onSort,
        pageSize: limit,
        pageSizes: pageSizes,
        pages: numPages,
        sortOrder: sort,
        total: total
      });
    }
  }]);

  return FormGrid;
}(_react["default"].Component);

exports["default"] = FormGrid;

_defineProperty(FormGrid, "propTypes", {
  columns: _types.Columns,
  formAccess: _propTypes["default"].func,
  forms: _propTypes["default"].object.isRequired,
  getForms: _propTypes["default"].func,
  onAction: _propTypes["default"].func,
  onPageSizeChanged: _propTypes["default"].func,
  operations: _types.Operations,
  pageSizes: _types.PageSizes
});

_defineProperty(FormGrid, "defaultProps", {
  columns: [{
    key: 'title',
    sort: true,
    title: 'Form',
    width: 8
  }, {
    key: 'operations',
    title: 'Operations',
    width: 4
  }],
  formAccess: function formAccess() {
    return {
      form: {
        create: true,
        view: true,
        edit: true,
        "delete": true
      },
      submission: {
        create: true,
        view: true,
        edit: true,
        "delete": true
      }
    };
  },
  getForms: function getForms() {},
  onPageSizeChanged: function onPageSizeChanged() {},
  operations: [{
    action: 'view',
    buttonType: 'primary',
    icon: 'pencil',
    permissionsResolver: function permissionsResolver() {
      return true;
    },
    title: 'Enter Data'
  }, {
    action: 'submission',
    buttonType: 'warning',
    icon: 'list-alt',
    permissionsResolver: function permissionsResolver() {
      return true;
    },
    title: 'View Data'
  }, {
    action: 'edit',
    buttonType: 'secondary',
    icon: 'edit',
    permissionsResolver: function permissionsResolver() {
      return true;
    },
    title: 'Edit Form'
  }, {
    action: 'delete',
    buttonType: 'danger',
    icon: 'trash',
    permissionsResolver: function permissionsResolver() {
      return true;
    }
  }],
  pageSizes: _constants.defaultPageSizes
});