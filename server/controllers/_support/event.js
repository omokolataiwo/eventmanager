import database from '../../db.json';
import validator from 'validator';

class Event {
  constructor(event) {
    this.error = false;
    this.errorMessages = {};
    this.load(event);
  }

  load(event) {
    this.name = event.name || '';
    this.startDate = event.startDate || '';
    this.endDate = event.endDate || '';
    this.time = event.time || '';
    this.state = event.state || '';
    this.summary = event.summary || '';
    this.center = event.center || '';
    this.id = event.id || null;
    this.centerdb = database.centers;
  }

  setId(id) {
    this.id = id;
  }

  updateCenter(){
    if (this.centerdb[this.center].events){
      this.centerdb[this.center].events.push(this.id);
      return;
    }
    this.centerdb[this.center].events = [this.id];
    return
  }

  validate() {
    if (validator.isEmpty(this.name ? '' + this.name : '')) {
      this.errorMessages.name = 'Event name can not be empty';
      this.error = true;
    }

    if (!validator.isInt(this.state ? '' + this.state : '') || Math.floor(parseInt(this.state)) < 1 || Math.floor(parseInt(this.state)) > 37) {
      this.errorMessages.state = 'Event state must be a state code';
      this.error = true;
    }

    let center = this.centerdb;

    if (!validator.isInt(this.center ? '' + this.center : '') || !center[this.center]) {
      this.errorMessages.center = 'Event center not a valid center';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.startDate)) || !this.isValidDate(this.endDate)) {
      this.errorMessages.startDate = 'Event must have a valid start date';
      this.error = true;
    }

    if (validator.isBefore(this.toValidatorString(this.startDate))) {
      this.errorMessages.startDate = "Event date is a passed date.";
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.endDate)) || !this.isValidDate(this.endDate)) {
      this.errorMessages.endDate = "Event must have a valid end date.";
      this.error = true;
    }
  }

toValidatorString(field) {
  return field ? '' + field : '';
}

isValidDate(dateString)
{
    //https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
      return false;

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

  safe() {
    return !this.error;
  }
  getErrors() {
    if (!this.error) return {};
    return this.errorMessages;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      time: this.time,
      state: this.state,
      summary: this.summary,
      center: this.center
    };
  }
}
export { Event as default };
