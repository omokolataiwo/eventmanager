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
    this.repassword = user.repassword || '';
  }

  validate() {
    if (this.password.length < 2 || this.password.length > 100) {
      this.errorMessages.password = 'password must be provided or too short';
      this.error = true;
    }
    const stateCode = Math.floor(parseInt(this.state));
    if (stateCode < 1 || stateCode > 37) {
      this.errorMessages.state = 'state must be a valid state code';
      this.error = true;
    }
    if (this.role < 1 || this.role > 2) {
      this.errorMessages.role = 'invalid role';
      this.error = true;
    }
    if (this.phonenumber.length !== 11) {
      this.errorMessages.phonenumber = 'phone number must be 11 digits';
      this.error = true;
    }
    if (this.password !== this.repassword) {
      this.errorMessages.password = 'Password and repassword does not match';
      this.error = true;
    }
  }


  isValidDate(dateString) {
    // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
      return false;
    }
    const parts = dateString.split('-');
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
      return false;
    }
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29;
    }
    return day > 0 && day <= monthLength[month - 1];
  }

  getErrors() {
    if (!this.error) return {};
    return this.errorMessages;
  }

  safe() {
    this.validate();
    return !this.error;
  }
}

export { User as default };
