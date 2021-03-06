/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayTrigger = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.uniqueid');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

var _puiReactMixins = require('pui-react-mixins');

var _puiReactMixins2 = _interopRequireDefault(_puiReactMixins);

var _scrim_mixin = require('pui-react-mixins/mixins/scrim_mixin');

var _scrim_mixin2 = _interopRequireDefault(_scrim_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var types = _react2.default.PropTypes;
var types = require('prop-types');

var TETHER_PLACEMENTS = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'middle right',
  right: 'middle left'
};

var privates = new _weakMap2.default();

var OverlayTrigger = exports.OverlayTrigger = function (_mixin$with) {
  (0, _inherits3.default)(OverlayTrigger, _mixin$with);

  function OverlayTrigger(props, context) {
    (0, _classCallCheck3.default)(this, OverlayTrigger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OverlayTrigger.__proto__ || (0, _getPrototypeOf2.default)(OverlayTrigger)).call(this, props, context));

    _this.triggerShow = function (eventType) {
      return function () {
        _this.show();
        var userCallback = _this.props.children.props[eventType];
        userCallback && userCallback.apply(undefined, arguments);
      };
    };

    _this.triggerHide = function (eventType) {
      return function () {
        _this.hide();
        var userCallback = _this.props.children.props[eventType];
        userCallback && userCallback.apply(undefined, arguments);
      };
    };

    _this.getDelay = function (display) {
      var _this$props = _this.props,
          delay = _this$props.delay,
          delayHide = _this$props.delayHide,
          delayShow = _this$props.delayShow;

      if (display && delayShow) return delayShow;
      if (!display && delayHide) return delayHide;
      return delay;
    };

    _this.scrimClick = function () {
      return _this.hide();
    };

    _this.setDisplay = function (display) {
      var oldTimeout = privates.get(_this).timeout;

      if (display === _this.state.display) {
        clearTimeout(oldTimeout);
        privates.set(_this, { timeout: null });
        return;
      }

      var delay = _this.getDelay(display);

      if (oldTimeout && delay) return;

      var timeout = void 0;
      if (delay) {
        timeout = setTimeout(function () {
          privates.set(_this, { timeout: null });
          _this.setState({ display: display });
        }, delay);
      } else {
        _this.setState({ display: display });
      }

      privates.set(_this, { timeout: timeout });
    };

    _this.click = function () {
      _this.setDisplay(!_this.state.display);
      var userCallback = _this.props.children.props.onClick;
      userCallback && userCallback.apply(undefined, arguments);
    };

    _this.show = function () {
      return _this.setDisplay(true);
    };

    _this.hide = function () {
      return _this.setDisplay(false);
    };

    privates.set(_this, {});
    _this.state = {
      display: props.display
    };
    return _this;
  }

  (0, _createClass3.default)(OverlayTrigger, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var display = _ref.display;

      if (display !== this.props.display) this.setDisplay(display);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.display !== this.state.display) {
        var _props = this.props,
            onEntered = _props.onEntered,
            onExited = _props.onExited;

        var callback = this.state.display ? onEntered : onExited;
        callback && callback();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if ((0, _get3.default)(OverlayTrigger.prototype.__proto__ || (0, _getPrototypeOf2.default)(OverlayTrigger.prototype), 'componentWillUnmount', this)) (0, _get3.default)(OverlayTrigger.prototype.__proto__ || (0, _getPrototypeOf2.default)(OverlayTrigger.prototype), 'componentWillUnmount', this).call(this);
      clearTimeout(privates.get(this).timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          overlay = _props2.overlay,
          pin = _props2.pin,
          placement = _props2.placement,
          trigger = _props2.trigger,
          props = (0, _objectWithoutProperties3.default)(_props2, ['children', 'overlay', 'pin', 'placement', 'trigger']);
      var display = this.state.display;


      var overlayId = overlay.props.id || (0, _lodash2.default)('overlay');
      overlay = _react2.default.cloneElement(overlay, { id: overlayId });

      var triggerHandlers = {
        'manual': {},
        'hover': {
          onMouseOver: this.triggerShow('onMouseOver'),
          onMouseOut: this.triggerHide('onMouseOut')
        },
        'focus': {
          onFocus: this.triggerShow('onFocus'),
          onBlur: this.triggerHide('onFocus')
        },
        'click': {
          onClick: this.click
        }
      }[trigger];

      children = _react2.default.cloneElement(children, (0, _extends3.default)({
        'aria-describedby': overlayId
      }, triggerHandlers));

      var tetherProps = (0, _extends3.default)({
        attachment: TETHER_PLACEMENTS[placement],
        constraints: pin ? [{ to: 'window', attachment: 'together', pin: true }] : [],
        classes: { 'target-attached': 'overlay-placement' }
      }, props);

      return _react2.default.createElement(
        _reactTether2.default,
        tetherProps,
        children,
        display && overlay
      );
    }
  }]);
  return OverlayTrigger;
}((0, _puiReactMixins2.default)(_react2.default.Component).with(_scrim_mixin2.default));

OverlayTrigger.propTypes = {
  delay: types.number,
  delayHide: types.number,
  delayShow: types.number,
  display: types.bool,
  onEntered: types.func,
  onExited: types.func,
  overlay: types.element,
  pin: types.bool,
  placement: types.oneOf(['top', 'bottom', 'left', 'right']),
  disableScrim: types.bool,
  trigger: types.oneOf(['hover', 'click', 'focus', 'manual'])
};
OverlayTrigger.defaultProps = {
  display: false,
  pin: true,
  placement: 'right',
  trigger: 'hover'
};
