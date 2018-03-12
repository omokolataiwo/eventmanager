import {validate} from 'validate.js';
export const createCenterValidationRule = {
	name: {
		presence: {
			allowEmpty: false,
			message: 'is required',
		},
		length: {
			minimum: 4,
			maximum: 120,
			tooShort: 'can not be less than 4 characters.',
			tooLong: 'can not be more than 120 characters.',
		},
	},
	address: {
		presence: {
			allowEmpty: false,
			message: 'is required',
		},
		length: {
			minimum: 4,
			maximum: 120,
		},
	},
	state: {
		presence: {
			allowEmpty: false,
			message: 'is required.',			
		},
		integer: {
			minimum: 4,
			maximum: 37,
			tooShort: 'can not be less than 4',
			tooLong: 'can not be more than 37.'
		},
	},
	capacity: {
		presences: {
			allowEmpty: false,
			message: 'is required.',	
		},
		integer: {
			minimum: 1,
			maximum: 10000000,
			tooShort: 'can not be less than 1',
			tooLong: 'capcity out of range'
		},
	},
	facilities: {
		presence: {
			allowEmpty: false,
			message: 'is required.',
		},		
	},
	amount: {
		presence: {
			allowEmpty: false,
			message: 'is required'
		},
		integer: {
			minimum: 100,
			maximum: 1000000,
			tooShort: 'too small',
			tooLong: 'out of range',
		},
	},
}
