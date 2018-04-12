import validator from 'validator';
import moment from 'moment';
import { ACCOUNT_TYPE_ADMIN, ACCOUNT_TYPE_USER } from './const';

class User {
  constructor(user) {
    this.error = false;
    this.errorMessages = {};
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.address = user.address || '';
    this.state = user.state || '';
    this.phoneNumber = user.phoneNumber || '';
    this.email = user.email || '';
    this.username = user.username || '';
    this.password = user.password || '';
    this.role = parseInt(user.role) || -1;
    this.matchPassword = user.matchPassword || '';
  }

  load(user) {
    this.firstName = user.firstName || this.firstName;
    this.lastName = user.lastName || this.lastName;
    this.address = user.address || this.address;
    this.state = user.state || this.state;
    this.phoneNumber = user.phoneNumber || this.phoneNumber;
    this.email = user.email || this.email;
    this.password = user.password || this.password;
    this.matchPassword = user.matchPassword || '';
    return this;
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

    if (this.role !== ACCOUNT_TYPE_ADMIN && this.role !== ACCOUNT_TYPE_USER) {
      this.errorMessages.role = 'invalid role';
      this.error = true;
    }

    if (this.password !== this.matchPassword) {
      this.errorMessages.password = 'Password and matchPassword does not match';
      this.error = true;
    }
  }

  getErrors() {
    if (!this.error) return {};
    return this.errorMessages;
  }

  safe() {
    this.validate();
    return !this.error;
  }
  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      state: this.state,
      phoneNumber: this.phoneNumber,
      email: this.email,
      username: this.username,
    };
  }
}

export { User as default };
