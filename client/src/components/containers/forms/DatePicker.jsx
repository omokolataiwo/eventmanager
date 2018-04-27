import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import PropTypes from 'prop-types';
import Error from '../Error';

const propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.arrayOf(PropTypes.string)
};

/**
 * DatePicker Component
 *
 * @class DatePicker
 * @extends {React.Component}
 */
class DatePicker extends React.Component {
  /**
   * Initialize materialize datepicker
   *
   * @returns {void}
   * @memberof DatePicker
   */
  componentDidMount() {
    const { id } = this.props;
    $(`.${id}`).pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false,
      onSet: (date) => {
        this.props.onChange({
          target: { id: this.props.id, value: date.select }
        });
      }
    });
  }

  /**
   * Renders the component
   *
   * @returns {object} - JSX DOM
   * @memberof DatePicker
   */
  render() {
    return (
      <div
        className={`input-field col s12 m${this.props.width} l${
          this.props.width
        }`}
      >
        <input
          id={this.props.id}
          type="text"
          defaultValue={moment(this.props.defaultValue).format('D MMMM, YYYY')}
          className={this.props.id}
        />
        <label className="active" htmlFor={this.props.id}>
          {this.props.title}
        </label>
        {this.props.errorMessage && (
          <Error messages={this.props.errorMessage} />
        )}
      </div>
    );
  }
}
DatePicker.propTypes = propTypes;
export default DatePicker;
