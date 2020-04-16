"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LEFT_PAGE = 'LEFT';
var RIGHT_PAGE = 'RIGHT';

function range(from, to) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i = from;
  var range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

function getPageNumbers(_ref) {
  var currentPage = _ref.currentPage,
      pageNeighbours = _ref.pageNeighbours,
      totalPages = _ref.totalPages;
  var totalNumbers = pageNeighbours * 2 + 3;
  var totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    var calculatedStartPage = Math.max(2, currentPage - pageNeighbours);
    var calculatedEndPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    var startPage = calculatedStartPage === 3 ? 2 : calculatedStartPage;
    var endPage = calculatedEndPage === totalPages - 2 ? totalPages - 1 : calculatedEndPage;
    var pages = range(startPage, endPage);
    var hasLeftSpill = startPage > 2;
    var hasRightSpill = totalPages - endPage > 1;
    var spillOffset = totalNumbers - (pages.length + 1);
    var extraPages;

    if (hasLeftSpill && !hasRightSpill) {
      extraPages = range(startPage - spillOffset, startPage - 1);
      pages = [LEFT_PAGE].concat(_toConsumableArray(extraPages), _toConsumableArray(pages));
    } else if (!hasLeftSpill && hasRightSpill) {
      extraPages = range(endPage + 1, endPage + spillOffset);
      pages = [].concat(_toConsumableArray(pages), _toConsumableArray(extraPages), [RIGHT_PAGE]);
    } else {
      pages = [LEFT_PAGE].concat(_toConsumableArray(pages), [RIGHT_PAGE]);
    }

    return [1].concat(_toConsumableArray(pages), [totalPages]);
  }

  return range(1, totalPages);
}

function Pagination(_ref2) {
  var activePage = _ref2.activePage,
      pageNeighbours = _ref2.pageNeighbours,
      pages = _ref2.pages,
      prev = _ref2.prev,
      next = _ref2.next,
      onSelect = _ref2.onSelect;
  var pageNumbers = getPageNumbers({
    currentPage: activePage,
    pageNeighbours: pageNeighbours,
    totalPages: pages
  });
  return /*#__PURE__*/_react["default"].createElement("nav", {
    "aria-label": "Page navigation"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "pagination"
  }, /*#__PURE__*/_react["default"].createElement("li", {
    className: "page-item ".concat(activePage === 1 ? 'disabled' : '')
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "page-link",
    onClick: function onClick() {
      if (activePage !== 1) {
        onSelect(activePage - 1);
      }
    },
    href: "javascript:void(0)"
  }, prev)), pageNumbers.map(function (page) {
    var className = page === activePage ? 'active' : '';

    if ([LEFT_PAGE, RIGHT_PAGE].includes(page)) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item disabled"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "page-link"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        "aria-hidden": "true"
      }, "...")));
    }

    return /*#__PURE__*/_react["default"].createElement("li", {
      className: "page-item ".concat(className),
      key: page
    }, /*#__PURE__*/_react["default"].createElement("a", {
      className: "page-link",
      onClick: function onClick() {
        return onSelect(page);
      },
      href: "javascript:void(0)"
    }, page));
  }), /*#__PURE__*/_react["default"].createElement("li", {
    className: "page-item ".concat(activePage === pages ? 'disabled' : '')
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "page-link",
    onClick: function onClick() {
      if (activePage !== pages) {
        onSelect(activePage + 1);
      }
    },
    href: "javascript:void(0)"
  }, next))));
}

Pagination.propTypes = {
  activePage: _propTypes["default"].number,
  pageNeighbours: _propTypes["default"].number,
  pages: _propTypes["default"].number.isRequired,
  prev: _propTypes["default"].string,
  next: _propTypes["default"].string,
  onSelect: _propTypes["default"].func.isRequired
};
Pagination.defaultProps = {
  activePage: 1,
  pageNeighbours: 1,
  prev: 'Previous',
  next: 'Next'
};
var _default = Pagination;
exports["default"] = _default;