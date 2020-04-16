"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageSizes = exports.PageSize = exports.Operations = exports.Operation = exports.Columns = exports.Column = exports.AllItemsPerPage = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AllItemsPerPage = 'all';
exports.AllItemsPerPage = AllItemsPerPage;

var Column = _propTypes["default"].shape({
  key: _propTypes["default"].string.isRequired,
  sort: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string, _propTypes["default"].func]),
  title: _propTypes["default"].string,
  value: _propTypes["default"].func,
  width: _propTypes["default"].number
});

exports.Column = Column;

var Columns = _propTypes["default"].arrayOf(Column);

exports.Columns = Columns;

var Operation = _propTypes["default"].shape({
  action: _propTypes["default"].string.isRequired,
  buttonType: _propTypes["default"].string,
  icon: _propTypes["default"].string,
  permissionsResolver: _propTypes["default"].func,
  title: _propTypes["default"].string
});

exports.Operation = Operation;

var Operations = _propTypes["default"].arrayOf(Operation);

exports.Operations = Operations;

var PageSize = _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
  label: _propTypes["default"].string,
  value: _propTypes["default"].number
}), _propTypes["default"].oneOf([AllItemsPerPage])]);

exports.PageSize = PageSize;

var PageSizes = _propTypes["default"].arrayOf(PageSize);

exports.PageSizes = PageSizes;