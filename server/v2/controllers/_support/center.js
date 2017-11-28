import validator from 'validator';
import Base from './base';

class Center {
  constructor(center) {
    super(center);
  }

  load(center) {
    this.name = center.name || '';
    this.capacity = center.capacity || '0';
    this.category = center.category || '';
    this.address = center.address || '';
    this.area = center.area || '';
    this.state = center.state || '';
    this.facilities = center.facilities || '';
    this.amount = center.amount || '';
    this.summary = center.summary || '';
    this.id = null;
  }

  validate() {
    if (validator.isEmpty(this.name ? '' + this.name : '')) {
      this.errorMessages.name = 'Center name can not be empty.';
      this.error = true;
    }
    if (!validator.isInt(this.capacity ? '' + this.capacity : '') || parseInt(this.capacity) < 1) {
      this.errorMessages.capacity = 'Center capacity is not a number or capacity too small.';
      this.error = true;
    }
    if (this.address.trim().length === 0) {
      this.errorMessages.address = 'Center must have an address.';
      this.error = true;
    }
    if (!validator.isInt(this.amount ? '' + this.amount : '')) {
      this.errorMessages.amount = 'Amount given must be a number';
      this.error = true;
    }
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      address: this.address,
      area: this.area,
      state: this.state,
      facilities: this.facilities,
      amount: this.amount,
      summary: this.summary
    };
  }
}
export { Center as default };
