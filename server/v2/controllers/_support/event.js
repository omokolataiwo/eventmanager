import validator from 'validator';
import moment from 'moment';

class Event {
  constructor(event) {
    this.error = false;
    this.name = event.name || '';
    this.startdate = moment(event.startdate).format('YYYY-MM-DD') || '';
    this.enddate = moment(event.enddate).format('YYYY-MM-DD')  || '';
    this.errorMessages = {};
  }

  load(event) {
    this.name = event.name ? event.name : this.name;
    this.startdate = event.startdate ? event.startdate : moment(this.startdate).format('YYYY-MM-DD');
    this.enddate = event.enddate ? event.enddate : moment(this.enddate).format('YYYY-MM-DD');
  }

  validate() {
    if (validator.isEmpty(this.toValidatorString(this.name))) {
      this.errorMessages.name = 'Event name can not be empty';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.startdate)) || !this.isValidDate(this.startdate)) {
      this.errorMessages.startdate = 'Event must have a valid start date';
      this.error = true;
    }

    if (validator.isBefore(this.toValidatorString(this.startdate))) {
      this.errorMessages.startdate = 'Event date is a passed date.';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.enddate)) || !this.isValidDate(this.enddate)) {
      this.errorMessages.enddate = 'Event must have a valid end date.';
      this.error = true;
    }
    const mEndDate = moment(this.enddate, 'YYYY-MM-DD');
    const mStartDate = moment(this.startdate, 'YYYY-MM-DD');
    
    if (mEndDate.diff(mStartDate, 'days') < 0)
    {
      this.errorMessages.startdate = 'Start date can not be greater than end date';
      this.error = true;
    }
  }

  toValidatorString (field) {
    return field ? '' + field : '';
  }

  isValidDate (dateString)
  {
    //https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
      return false;
    }

    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    if(year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];
  }

  getErrors() {
    if (!this.error) return {};
    return this.errorMessages;
  }

  datetoString(date) {
    return date.getYear() + '-' + date.getMonth() + '-' + date.getDay();
  }
  safe() {
    this.validate();
    return !this.error;
  }


  toJSON() {
    return {
      name: this.name,
      startdate: this.startdate,
      enddate: this.enddate
    };
  }
}

export { Event as default };
