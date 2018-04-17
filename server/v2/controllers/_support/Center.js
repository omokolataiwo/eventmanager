import validate from 'validate.js';

class Center {
  constructor(center) {
    this.error = false;
    this.errorMessages = {};
    this.name = center.name;
    this.address = center.address;
    this.state = center.state;
    this.capacity = parseInt(center.capacity, 10);
    this.ownerid = center.ownerid;
    this.facilities = center.facilities || 'No facilities';
    this.amount = parseInt(center.amount, 10);
  }
  load(center) {
    this.name = center.name || this.name;
    this.address = center.address || this.address;
    this.state = center.state || this.state;
    this.capacity = parseInt(center.capacity, 10) || this.capacity;
    this.facilities = center.facilities || this.facilities;
    this.amount = parseInt(center.amount, 10) || this.amount;
    return this;
  }

  validate() {
    const stateCode = Math.floor(parseInt(this.state, 10));
    if (stateCode < 1 || stateCode > 37) {
      this.errorMessages.state = ['state must be a valid state code'];
      this.error = true;
    }

    const invalidName = validate.single(this.name, {
      presence: true,
      length: { minimum: 5 },
    });
    if (invalidName) {
      this.errorMessages.name = ['Center name must be more than 4 characters.'];
      this.error = true;
    }

    if (!validate.isInteger(this.amount) || this.amount < 0 || this.amount > 2000000000) {
      this.errorMessages.amount = ['Amount is not a valid value'];
      this.error = true;
    }

    if (!validate.isInteger(this.capacity) || this.capacity < 1 || this.capacity > 2000000000) {
      this.errorMessages.capacity = ['Capacity is not a valid value'];
      this.error = true;
    }

    const invalidAddress = validate.single(this.address, {
      presence: true,
      length: { minimum: 5, message: ['must be more than 4 characters.'] },
    });
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
      facilities: this.facilities,
      amount: this.amount,
    };
  }
}
export default Center;

export const create = (req, res, models) => {
  if (!req.body.contactid) {
    return res.status(422).json({ contactid: 'Contact is required.' });
  }
  return models.centers
    .create(req.body)
    .then(center => res.status(201).json(center))
    .catch(() => res.status(500).send('Internal Server Error'));
};

export const updateCenter = (req, res, models) => {
  if (!req.body.contactid) {
    return res.status(422).json({ contactid: 'Contact is required.' });
  }

  return models.centers
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then(() => res.status(201).json(req.body))
    .catch(() => res.status(500).send('Internal Server Error'));
};
