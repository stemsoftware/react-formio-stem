"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Field2 = _interopRequireDefault(require("formiojs/components/_classes/field/Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReactComponent = /*#__PURE__*/function (_Field) {
  _inherits(ReactComponent, _Field);

  var _super = _createSuper(ReactComponent);

  /**
   * This is the first phase of component building where the component is instantiated.
   *
   * @param component - The component definition created from the settings form.
   * @param options - Any options passed into the renderer.
   * @param data - The submission data where this component's data exists.
   */
  function ReactComponent(Component, options, data) {
    var _this;

    _classCallCheck(this, ReactComponent);

    _this = _super.call(this, Component, options, data);

    _defineProperty(_assertThisInitialized(_this), "updateValue", function (value, flags) {
      flags = flags || {};
      var newValue = value === undefined || value === null ? _this.getValue() : value;
      var changed = newValue !== undefined ? _this.hasChanged(newValue, _this.dataValue) : false;
      _this.dataValue = Array.isArray(newValue) ? _toConsumableArray(newValue) : newValue;

      _this.updateOnChange(flags, changed);

      return changed;
    });

    return _this;
  }
  /**
   * This method is called any time the component needs to be rebuilt. It is most frequently used to listen to other
   * components using the this.on() function.
   */


  _createClass(ReactComponent, [{
    key: "init",
    value: function init() {
      return _get(_getPrototypeOf(ReactComponent.prototype), "init", this).call(this);
    }
    /**
     * This method is called before the component is going to be destroyed, which is when the component instance is
     * destroyed. This is different from detach which is when the component instance still exists but the dom instance is
     * removed.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      return _get(_getPrototypeOf(ReactComponent.prototype), "destroy", this).call(this);
    }
    /**
     * The second phase of component building where the component is rendered as an HTML string.
     *
     * @returns {string} - The return is the full string of the component
     */

  }, {
    key: "render",
    value: function render() {
      // For react components, we simply render as a div which will become the react instance.
      // By calling super.render(string) it will wrap the component with the needed wrappers to make it a full component.
      return _get(_getPrototypeOf(ReactComponent.prototype), "render", this).call(this, "<div ref=\"react-".concat(this.id, "\"></div>"));
    }
    /**
     * The third phase of component building where the component has been attached to the DOM as 'element' and is ready
     * to have its javascript events attached.
     *
     * @param element
     * @returns {Promise<void>} - Return a promise that resolves when the attach is complete.
     */

  }, {
    key: "attach",
    value: function attach(element) {
      _get(_getPrototypeOf(ReactComponent.prototype), "attach", this).call(this, element); // The loadRefs function will find all dom elements that have the "ref" setting that match the object property.
      // It can load a single element or multiple elements with the same ref.


      this.loadRefs(element, _defineProperty({}, "react-".concat(this.id), 'single'));

      if (this.refs["react-".concat(this.id)]) {
        this.reactInstance = this.attachReact(this.refs["react-".concat(this.id)]);

        if (this.shouldSetValue) {
          this.setValue(this.dataForSetting);
          this.updateValue(this.dataForSetting);
        }
      }

      return Promise.resolve();
    }
    /**
     * The fourth phase of component building where the component is being removed from the page. This could be a redraw
     * or it is being removed from the form.
     */

  }, {
    key: "detach",
    value: function detach() {
      if (this.refs["react-".concat(this.id)]) {
        this.detachReact(this.refs["react-".concat(this.id)]);
      }

      _get(_getPrototypeOf(ReactComponent.prototype), "detach", this).call(this);
    }
    /**
     * Override this function to insert your custom component.
     *
     * @param element
     */

  }, {
    key: "attachReact",
    value: function attachReact(element) {
      return;
    }
    /**
     * Override this function.
     */

  }, {
    key: "detachReact",
    value: function detachReact(element) {
      return;
    }
    /**
     * Something external has set a value and our component needs to be updated to reflect that. For example, loading a submission.
     *
     * @param value
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this.reactInstance) {
        this.reactInstance.setState({
          value: value
        });
        this.shouldSetValue = false;
      } else {
        this.shouldSetValue = true;
        this.dataForSetting = value;
      }
    }
    /**
     * The user has changed the value in the component and the value needs to be updated on the main submission object and other components notified of a change event.
     *
     * @param value
     */

  }, {
    key: "getValue",

    /**
     * Get the current value of the component. Should return the value set in the react component.
     *
     * @returns {*}
     */
    value: function getValue() {
      if (this.reactInstance) {
        return this.reactInstance.state.value;
      }

      return this.defaultValue;
    }
    /**
     * Override normal validation check to insert custom validation in react component.
     *
     * @param data
     * @param dirty
     * @param rowData
     * @returns {boolean}
     */

  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, rowData) {
      var valid = _get(_getPrototypeOf(ReactComponent.prototype), "checkValidity", this).call(this, data, dirty, rowData);

      if (!valid) {
        return false;
      }

      return this.validate(data, dirty, rowData);
    }
    /**
     * Do custom validation.
     *
     * @param data
     * @param dirty
     * @param rowData
     * @returns {boolean}
     */

  }, {
    key: "validate",
    value: function validate(data, dirty, rowData) {
      return true;
    }
  }]);

  return ReactComponent;
}(_Field2["default"]);

exports["default"] = ReactComponent;