import validator from 'validator';
import moment from 'moment';

class User {

  constructor(user) {
    this.error = false;
    this.errorMessages = {};

    this.firstname = user.firstname || '';
    this.lastname = user.lastname || '';
    this.address = user.address || '';
    this.state = user.state || '';
    this.phonenumber = user.phonenumber || '';
    this.email = user.email || '';
    this.username = user.username || '';
    this.password = user.password || '';
    this.role = user.role || '';
  }

  validate() {
    if (validator.isEmpty(this.toValidatorString(this.firstname))) {
      this.errorMessages.firstname = 'first name can not be empty';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.lastname))) {
      this.errorMessages.lastname = 'last name can not be empty';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.address)) || this.address.length < 5 || this.address.length > 100) {
      this.errorMessages.address = 'address can not be empty or too long';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.username)) || this.username.length < 2 || this.username.length > 100) {
      this.errorMessages.username = 'username must be provided or too short';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.password)) || this.password.length < 2 || this.password.length > 100) {
      this.errorMessages.password = 'password must be provided or too short';
      this.error = true;
    }

    const stateCode = Math.floor(parseInt(this.state));
    if (!validator.isInt(this.toValidatorString(stateCode)) || stateCode < 1 || stateCode > 37) {
      this.errorMessages.state = 'state must be a valid state code';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.role)) || this.role < 1 || this.role > 2) {
      this.errorMessages.role = 'invalid role';
      this.error = true;
    }

    if (!validator.isInt(this.toValidatorString(this.phonenumber))) {
      this.errorMessages.phonenumber = 'phone number is not a number.';
      this.error = true;
    }

    if (!validator.isEmail(this.toValidatorString(this.email))) {
      this.errorMessages.email = 'invalid email format';
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

export { User as default };
