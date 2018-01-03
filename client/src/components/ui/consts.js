import validate from 'validate.js';

export const STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Federal Capital Territory','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

export const SIGNUP_VALIDATION_RULES = {
	first_name: {
		presence: {
			allowEmpty: false,
			message: 'is required.'
		
		}
	},
	last_name: {
		presence: {
			allowEmpty: false,
			message: 'is required.'
		}
	},
	address: {
		presence: {
			allowEmpty: false,
			message: 'is required.',
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
	email: {
		presence: {
			allowEmpty: false,
			message: 'address is required',
		},
		email: {
			message: 'is not a valid email address',
		}
	},
	username: {
		presence: {
			allowEmpty: false,
			message: 'is required.'
		},
		length: {
			minimum: 6,
			maximum: 120,
			tooShort: 'should be at least 6 chaaracters'
		}
	},
	password: {
			presence: {
			allowEmpty: false,
			message: 'is required.'
		},
	},
	repassword: {
		equality: {
			attribute: 'password',
			message: (v, a, va, g) => validate.format('^ does not match Password',{v})
		}
	}
}
