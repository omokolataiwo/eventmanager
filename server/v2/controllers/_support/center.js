import { invalid } from "moment";
import validate from 'validate.js';

class Center {
  constructor(center) {
    this.error = false;
    this.errorMessages = {};

    this.name = center.name;
    this.address = center.address;
    this.state = center.state;
    this.capacity = parseInt(center.capacity);
    this.ownerid = center.ownerid;
    this.facilities = center.facilities;
    this.amount = parseInt(center.amount);
  }
  load(center) {
    this.name = center.name || this.name;
    this.address = center.address || this.address;
    this.state = center.state || this.state;
    this.capacity = parseInt(center.capacity) || this.capacity;
    this.ownerid = center.ownerid || this.ownerid;
    this.facilities = center.facilities || this.facilities;
    this.amount = parseInt(center.amount) || this.amount;
  }

  validate() {
    const stateCode = Math.floor(parseInt(this.state));
    if (stateCode < 1 || stateCode > 37) {
      this.errorMessages.state = 'state must be a valid state code';
      this.error = true;
    }

    const invalidName = validate.single(this.name, {presence: true, length: {minimum: 5, message: 'must be more than 4 characters.'}});
    if (invalidName) {
      this.errorMessages.name = invalidName[0];
      this.error = true;
    }

    if (!validate.isInteger(this.amount) || this.amount < 0 || this.amount > 2000000000) {
      this.errorMessages.amount = 'Amount is not a valid value';
      this.error = true;
    }

    if (!validate.isInteger(this.capacity) || this.capacity < 1 || this.capacity > 2000000000) {
      this.errorMessages.amount = 'Capacity is not a valid value';
      this.error = true;
    }

    const invalidAddress = validate.single(this.address, {presence: true, length: {minimum: 5, message: 'must be more than 4 characters.'}});
    if (invalidAddress) {
      this.errorMessages.address = invalidAddress;
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
      name: this.name,
      address: this.address,
      state: this.state,
      capacity: this.capacity,
      facilites: this.facilities,
      amount: this.amount
    };
  }
}
export { Center as default };
