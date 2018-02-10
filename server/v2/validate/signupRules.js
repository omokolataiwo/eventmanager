import { validate } from 'validate.js';

export const signupRules  = {
	firstname: {
		presence: {
			allowEmpty: false,
			message: 'is required.'
		}
	},
	lastname: {
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
			tooShort: 'should be at least 6 characters'
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