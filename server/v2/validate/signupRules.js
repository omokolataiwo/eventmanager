import validate from 'validate.js';

export default {
  firstName: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 4
    }
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  address: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'can not be less than 4 characters.',
      tooLong: 'can not be more than 120 characters.'
    }
  },
  state: {
    presence: {
      allowEmpty: false,
      message: '^Please select a state'
    }
  },

  role: {
    presence: {
      allowEmpty: false,
      message: '^Please select account type'
    }
  },
  email: {
    presence: {
      allowEmpty: false,
      message: 'address is required'
    },
    email: {
      message: 'is not a valid email address'
    }
  },
  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: 'is required'
    },
    numericality: {
      onlyInteger: true,
      strict: true
    },
    length: {
      is: 11
    }
  },
  username: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    },
    length: {
      minimum: 4,
      maximum: 120,
      tooShort: 'should be at least 4 characters'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'is required.'
    }
  },
  matchPassword: {
    equality: {
      attribute: 'password',
      message: v => validate.format('is not the same as Password', { v })
    }
  }
};
