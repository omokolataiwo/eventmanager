import { validate } from 'validate.js';
import {
  centerRules,
  contactRules
} from '../middleware/createCenterValidation';

const updateCenterRules = {
  contactId: {
    numericality: {
      greaterThan: 0,
      lessThan: 100000,
      message: '^Invalid contact id'
    }
  },
  active: {
    numericality: {
      greaterThan: -1,
      lessThan: 2,
      message: 'Center available is not valid'
    }
  }
};

/**
 * Validator for sign up
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */

export default (req, res, next) => {
  const errors = [];

  const updatingField = {};
  const fieldRules = {};
  const rules = { ...centerRules, ...updateCenterRules };

  [
    'name',
    'capacity',
    'address',
    'amount',
    'state',
    'facilities',
    'area',
    'type',
    'image',
    'contactId',
    'details',
    'newContact',
    'active'
  ].forEach((field) => {
    if (req.body[field] || field === 'active') {
      updatingField[field] = req.body[field];
      fieldRules[field] = rules[field];
    }
  });

  const centerErrors = validate(updatingField, { ...fieldRules });

  if (centerErrors) errors.push(centerErrors);

  const center = req.body;
  if (center.newContact && center.contact) {
    const contactErrors = validate(center.contact, contactRules);
    if (contactErrors) errors.push(contactErrors);
    updatingField.contact = center.contact;
    updatingField.newContact = center.newContact;
  }
  if (errors.length) {
    return res.status(422).json({
      status: 'error',
      errors
    });
  }
  req.body = updatingField;
  console.log('========================> ', updatingField);
  return next();
};
