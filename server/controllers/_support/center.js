import validator from 'validator';

class Center {
  constructor(center) {
    this.error = false;
    this.errorMessages = {};
    this.load(center);
  }

  load(center) {
    this.name = center.name + "" || '';
    this.capacity = center.capacity + "" || 0;
    this.category = center.category + "" || '';
    this.address = center.address + "" || '';
    this.area = center.area + "" || '';
    this.state = center.state + "" || '';
    this.facilities = center.facilities + "" || '';
    this.amount = center.amount + "" || '';
    this.summary = center.summary + "" || '';
    this.id = null;
  }

  setId(id) {
    this.id = id;
  }

  validate() {
    if (validator.isEmpty(this.name)) {
      this.errorMessages.name = 'Center name can not be empty.';
      this.error = true;
    }
    if (!validator.isInt(this.capacity)) {
      this.errorMessages.capacity = 'Center capacity is not a number.';
      this.error = true;
    }
    if (this.address.trim().length === 0) {
      this.errorMessages.address = 'Center must have an address.';
      this.error = true;
    }
    if (!validator.isInt(this.amount)) {
      this.errorMessages.amount = 'Amount given must be a number';
      this.error = true;
    }
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
      capacity: this.capacity,
      address: this.address,
      area: this.area,
      state: this.state,
      facilities: this.facilities,
      amount: this.amount,
      summary: this.summary,
    };
  }
}
export { Center as default };
