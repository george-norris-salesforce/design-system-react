/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SLDSPopover = require('../SLDSPopover');

var _SLDSPopover2 = _interopRequireDefault(_SLDSPopover);

var _index = require('./SLDSDatePicker/index');

var _index2 = _interopRequireDefault(_index);

var _InputIcon = require('../SLDSIcon/InputIcon');

var _InputIcon2 = _interopRequireDefault(_InputIcon);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayName = 'SLDSDatepickerSingleSelect';
var propTypes = {
  abbrWeekDayLabels: _react2.default.PropTypes.array,

  /**
   * Date formatting function
   */
  formatter: _react2.default.PropTypes.func,

  monthLabels: _react2.default.PropTypes.array,

  /**
   * Parsing date string into Date
   */
  parser: _react2.default.PropTypes.func,

  relativeYearFrom: _react2.default.PropTypes.number,

  relativeYearTo: _react2.default.PropTypes.number,

  todayLabel: _react2.default.PropTypes.string,

  /**
   * Date
   */
  value: _react2.default.PropTypes.instanceOf(Date),

  strValue: _react2.default.PropTypes.string,

  weekDayLabels: _react2.default.PropTypes.array

};
var defaultProps = {
  abbrWeekDayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  formatter: function formatter(date) {
    if (date) {
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
  },

  monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  onDateChange: function onDateChange(date, strValue) {
    console.log('onDateChange should be defined');
  },
  parser: function parser(str) {
    return new Date(str);
  },

  placeholder: 'Pick a Date',
  relativeYearFrom: -5,
  relativeYearTo: 5,
  todayLabel: 'Today',
  value: null,
  weekDayLabels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

module.exports = _react2.default.createClass({

  displayName: displayName,

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },
  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      value: this.props.value,
      strValue: this.props.strValue
    };
  },
  handleChange: function handleChange(date) {
    this.setState({
      value: date,
      strValue: this.props.formatter(date),
      isOpen: false
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(date);
    }
  },
  handleClose: function handleClose() {
    this.setState({ isOpen: false });
    this.setFocus();
  },
  handleClick: function handleClick() {
    this.setState({ isOpen: true });
  },
  handleFocus: function handleFocus() {
    //    this.setState({isOpen:true})
  },
  handleBlur: function handleBlur() {
    //    this.setState({isOpen:false})
  },
  setFocus: function setFocus() {
    if (this.isMounted()) {
      _reactDom2.default.findDOMNode(this.refs.date).focus();
    }
  },
  parseDate: function parseDate(strValue) {
    var d = this.props.parser(strValue);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    return new Date();
  },
  popover: function popover() {
    if (this.state && this.state.isOpen) {
      var date = this.state.strValue ? this.parseDate(this.state.strValue) : this.state.value;
      return _react2.default.createElement(
        _SLDSPopover2.default,
        { className: 'slds-dropdown', targetElement: this.refs.date, onClose: this.handleClose },
        _react2.default.createElement(_index2.default, {
          onChange: this.handleChange,
          selected: this.state.selected,
          onClose: this.handleClose,
          abbrWeekDayLabels: this.props.abbrWeekDayLabels,
          weekDayLabels: this.props.weekDayLabels,
          monthLabels: this.props.monthLabels,
          todayLabel: this.props.todayLabel,
          relativeYearFrom: this.props.relativeYearFrom,
          relativeYearTo: this.props.relativeYearTo,
          selectedDate: date ? date : new Date() })
      );
    }
    return _react2.default.createElement('span', null);
  },
  handleInputChange: function handleInputChange() {
    var string = _reactDom2.default.findDOMNode(this.refs.date).value;
    this.setState({
      strValue: string
    });
    if (this.props.onDateChange) {
      var d = this.props.parser(string);
      this.props.onDateChange(d, string);
    }
  },
  handleKeyDown: function handleKeyDown(event) {
    if (event.keyCode) {
      var isShift = !!event.shiftKey;
      if (!isShift && (event.keyCode === _utils.KEYS.ENTER ||
      //          event.keyCode === KEYS.SPACE ||
      event.keyCode === _utils.KEYS.DOWN || event.keyCode === _utils.KEYS.UP)) {
        _utils.EventUtil.trapEvent(event);

        this.setState({
          isOpen: true
        });
      }
    }
  },
  getInputIcon: function getInputIcon() {
    return _react2.default.createElement(_InputIcon2.default, { name: 'event', style: { pointerEvents: 'none' } });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'slds-form-element' },
      _react2.default.createElement(
        'label',
        { className: 'slds-form-element__label', htmlFor: 'date' },
        this.props.label
      ),
      _react2.default.createElement(
        'div',
        { className: 'slds-form-element__control' },
        _react2.default.createElement(
          'div',
          { className: 'slds-input-has-icon slds-input-has-icon--right' },
          this.getInputIcon(),
          _react2.default.createElement('input', {
            name: 'date',
            ref: 'date',
            className: 'slds-input',
            type: 'text',
            placeholder: this.props.placeholder,
            value: this.state.strValue,
            onKeyDown: this.handleKeyDown,
            onChange: this.handleInputChange,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus })
        )
      ),
      this.popover()
    );
  }
});