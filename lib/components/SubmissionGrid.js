"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("formiojs/utils"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

var _types = require("../types");

var _utils2 = require("../utils");

var _Grid = _interopRequireDefault(require("./Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var SubmissionGrid = /*#__PURE__*/function (_React$Component) {
  _inherits(SubmissionGrid, _React$Component);

  var _super = _createSuper(SubmissionGrid);

  function SubmissionGrid() {
    var _this;

    _classCallCheck(this, SubmissionGrid);

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
          getSubmissions = _this$props.getSubmissions,
          currentSort = _this$props.submissions.sort;
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

      getSubmissions(1, {
        sort: nextSort
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getColumns", function (form) {
      var columns = [];

      _utils["default"].eachComponent(form.components, function (component) {
        if (component.input && component.tableView && component.key) {
          columns.push((0, _utils2.getComponentDefaultColumn)(component));
        }
      });

      columns.push({
        key: 'operations',
        title: 'Operations'
      });
      (0, _utils2.setColumnsWidth)(columns);
      return columns;
    });

    _defineProperty(_assertThisInitialized(_this), "Cell", function (_ref2) {
      var submission = _ref2.row,
          column = _ref2.column;
      var _this$props2 = _this.props,
          form = _this$props2.form,
          onAction = _this$props2.onAction,
          operations = _this$props2.operations;

      if (column.key === 'operations') {
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
          return permissionsResolver(form, submission) ? /*#__PURE__*/_react["default"].createElement("span", {
            className: "btn btn-".concat(buttonType, " btn-sm form-btn"),
            onClick: (0, _utils2.stopPropagationWrapper)(function () {
              return onAction(submission, action);
            }),
            key: action
          }, icon ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
            className: "fa fa-".concat(icon)
          }), "\xA0") : null, title) : null;
        }));
      }

      var value = (0, _isFunction2["default"])(column.value) ? column.value(submission) : (0, _get2["default"])(submission, column.key, '');
      return (0, _isObject2["default"])(value) && value.content ? value.isHtml ? /*#__PURE__*/_react["default"].createElement("div", {
        dangerouslySetInnerHTML: {
          __html: value.content
        }
      }) : /*#__PURE__*/_react["default"].createElement("span", null, String(value.content)) : /*#__PURE__*/_react["default"].createElement("span", null, String(value));
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props3 = _this.props,
          propColumns = _this$props3.columns,
          form = _this$props3.form,
          getSubmissions = _this$props3.getSubmissions,
          onAction = _this$props3.onAction,
          onPageSizeChanged = _this$props3.onPageSizeChanged,
          pageSizes = _this$props3.pageSizes,
          _this$props3$submissi = _this$props3.submissions,
          limit = _this$props3$submissi.limit,
          _this$props3$submissi2 = _this$props3$submissi.pagination,
          page = _this$props3$submissi2.page,
          numPages = _this$props3$submissi2.numPages,
          total = _this$props3$submissi2.total,
          sort = _this$props3$submissi.sort,
          submissions = _this$props3$submissi.submissions;
      var columns = propColumns.length ? propColumns : _this.getColumns(form);
      var skip = (page - 1) * limit;
      var last = Math.min(skip + limit, total);
      return /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        Cell: _this.Cell,
        activePage: page,
        columns: columns,
        emptyText: "No data found",
        firstItem: skip + 1,
        items: submissions,
        lastItem: last,
        onAction: onAction,
        onPage: getSubmissions,
        onPageSizeChanged: onPageSizeChanged,
        onSort: _this.onSort,
        pageSize: limit,
        pageSizes: pageSizes,
        pages: numPages,
        sortOrder: sort,
        total: total
      });
    });

    return _this;
  }

  return SubmissionGrid;
}(_react["default"].Component);

exports["default"] = SubmissionGrid;

_defineProperty(SubmissionGrid, "propTypes", {
  columns: _types.Columns,
  form: _propTypes["default"].object.isRequired,
  getSubmissions: _propTypes["default"].func,
  onAction: _propTypes["default"].func,
  onPageSizeChanged: _propTypes["default"].func,
  operations: _types.Operations,
  pageSizes: _types.PageSizes,
  submissions: _propTypes["default"].object.isRequired
});

_defineProperty(SubmissionGrid, "defaultProps", {
  columns: [],
  getSubmissions: function getSubmissions() {},
  onAction: function onAction() {},
  onPageSizeChanged: function onPageSizeChanged() {},
  operations: [{
    action: 'view',
    buttonType: 'warning',
    icon: 'list-alt',
    permissionsResolver: function permissionsResolver() {
      return true;
    },
    title: 'View'
  }, {
    action: 'edit',
    buttonType: 'secondary',
    icon: 'edit',
    permissionsResolver: function permissionsResolver() {
      return true;
    },
    title: 'Edit'
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