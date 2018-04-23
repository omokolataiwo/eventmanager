import bcrypt from 'bcryptjs';
import models from '../models';
import userFixture from './fixtures/users';

export const registerAccount = (user) => {
  user.password = bcrypt.hashSync(user.password, 8);
  return models.users.create(user);
};

export const createCenter = async (center) => {
  const { contact } = center;
  contact.ownerId = center.ownerId;
  const newContact = await models.contacts.create(contact);
  center.contactId = newContact.id;
  center.approve = 1;
  return models.centers.create(center);
};
