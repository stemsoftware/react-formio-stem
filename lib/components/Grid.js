"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

var _types = require("../types");

var _Pagination = _interopRequireDefault(require("./Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function normalizePageSize(pageSize) {
  if ((0, _isObject2["default"])(pageSize)) {
    return pageSize;
  }

  if (pageSize === _types.AllItemsPerPage) {
    return {
      label: 'All',
      value: 999999
    };
  }

  return {
    label: pageSize,
    value: pageSize
  };
}

var renderPagination = function renderPagination(_ref) {
  var pages = _ref.pages,
      onPage = _ref.onPage;
  return pages && onPage;
};

var renderPageSizeSelector = function renderPageSizeSelector(_ref2) {
  var pageSize = _ref2.pageSize,
      pageSizes = _ref2.pageSizes,
      onPageSizeChanged = _ref2.onPageSizeChanged;
  return pageSize && pageSizes && pageSizes.length && onPageSizeChanged;
};

var renderItemCounter = function renderItemCounter(_ref3) {
  var firstItem = _ref3.firstItem,
      lastItem = _ref3.lastItem,
      total = _ref3.total;
  return firstItem && lastItem && total;
};

var renderFooter = function renderFooter(props) {
  return renderPagination(props) || renderItemCounter(props);
};

function Grid(props) {
  var Cell = props.Cell,
      activePage = props.activePage,
      columns = props.columns,
      emptyText = props.emptyText,
      firstItem = props.firstItem,
      items = props.items,
      lastItem = props.lastItem,
      onAction = props.onAction,
      onPage = props.onPage,
      onPageSizeChanged = props.onPageSizeChanged,
      onSort = props.onSort,
      pageNeighbours = props.pageNeighbours,
      pageSize = props.pageSize,
      pageSizes = props.pageSizes,
      pages = props.pages,
      sortOrder = props.sortOrder,
      total = props.total;
  var normalizedPageSizes = pageSizes.map(normalizePageSize);
  return /*#__PURE__*/_react["default"].createElement("div", null, items.length ? /*#__PURE__*/_react["default"].createElement("ul", {
    className: "list-group list-group-striped"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "list-group-item list-group-header hidden-xs hidden-md"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, columns.map(function (column) {
    var key = column.key,
        _column$sort = column.sort,
        sort = _column$sort === void 0 ? false : _column$sort,
        _column$title = column.title,
        title = _column$title === void 0 ? '' : _column$title,
        width = column.width;
    var className = "col col-md-".concat(width);
    var columnProps = {
      key: key,
      className: className
    };

    if (!title) {
      return /*#__PURE__*/_react["default"].createElement("div", columnProps);
    }

    if (!sort) {
      return /*#__PURE__*/_react["default"].createElement("div", columnProps, /*#__PURE__*/_react["default"].createElement("strong", null, title));
    }

    var sortKey = (0, _isString2["default"])(sort) ? sort : key;
    var ascSort = sortKey;
    var descSort = "-".concat(sortKey);
    var sortClass = '';

    if (sortOrder === ascSort) {
      sortClass = 'glyphicon glyphicon-triangle-top fa fa-caret-up';
    } else if (sortOrder === descSort) {
      sortClass = 'glyphicon glyphicon-triangle-bottom fa fa-caret-down';
    }

    return /*#__PURE__*/_react["default"].createElement("div", columnProps, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return onSort(column);
      }
    }, /*#__PURE__*/_react["default"].createElement("strong", null, title, " ", /*#__PURE__*/_react["default"].createElement("span", {
      className: sortClass
    }))));
  }))), items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: "list-group-item",
      key: item._id
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "row",
      onClick: function onClick() {
        return onAction(item, 'row');
      }
    }, columns.map(function (column) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: column.key,
        className: "col col-md-".concat(column.width)
      }, /*#__PURE__*/_react["default"].createElement(Cell, {
        row: item,
        column: column
      }));
    })));
  }), renderFooter(props) ? /*#__PURE__*/_react["default"].createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row align-items-center"
  }, renderPagination(props) ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row align-items-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/_react["default"].createElement(_Pagination["default"], {
    pages: pages,
    activePage: activePage,
    pageNeighbours: pageNeighbours,
    prev: "Previous",
    next: "Next",
    onSelect: onPage
  })), renderPageSizeSelector(props) ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row align-items-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    className: "form-control",
    value: pageSize,
    onChange: function onChange(event) {
      return onPageSizeChanged(event.target.value);
    }
  }, normalizedPageSizes.map(function (_ref4) {
    var label = _ref4.label,
        value = _ref4.value;
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: value,
      value: value
    }, label);
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "col-auto"
  }, "items per page"))) : null)) : null, renderItemCounter(props) ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-auto ml-auto"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "item-counter pull-right"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "page-num"
  }, firstItem, " - ", lastItem), " / ", total, " total")) : null)) : null) : /*#__PURE__*/_react["default"].createElement("div", null, emptyText));
}

Grid.propTypes = {
  Cell: _propTypes["default"].func,
  activePage: _propTypes["default"].number,
  columns: _propTypes["default"].array.isRequired,
  emptyText: _propTypes["default"].string,
  firstItem: _propTypes["default"].number,
  items: _propTypes["default"].array.isRequired,
  lastItem: _propTypes["default"].number,
  onAction: _propTypes["default"].func,
  onPage: _propTypes["default"].func,
  onPageSizeChanged: _propTypes["default"].func,
  onSort: _propTypes["default"].func,
  pageNeighbours: _propTypes["default"].number,
  pageSize: _propTypes["default"].number,
  pageSizes: _types.PageSizes,
  pages: _propTypes["default"].number,
  sortOrder: _propTypes["default"].string,
  total: _propTypes["default"].number
};
Grid.defaultProps = {
  Cell: function Cell(_ref5) {
    var column = _ref5.column,
        row = _ref5.row;
    return /*#__PURE__*/_react["default"].createElement("span", null, (0, _get2["default"])(row, column.key, ''));
  },
  activePage: 1,
  emptyText: 'No data found',
  firstItem: 0,
  lastItem: 0,
  onAction: function onAction() {},
  onPage: function onPage() {},
  onPageSizeChanged: function onPageSizeChanged() {},
  onSort: function onSort() {},
  pageNeighbours: 1,
  pageSize: 0,
  pageSizes: _constants.defaultPageSizes,
  pages: 0,
  sortOrder: '',
  total: 0
};
var _default = Grid;
exports["default"] = _default;