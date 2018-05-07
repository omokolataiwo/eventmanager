import {
  ACCOUNT_TYPE_MEMBER,
  ACCOUNT_TYPE_ADMIN,
  ACCOUNT_TYPE_SUPER_ADMIN
} from '../consts';

/**
 * Return path base on user role
 * @param {int} role - The role of the user
 * @returns {string} - The path of the user
 */
const getPath = role => {
  if (role === ACCOUNT_TYPE_MEMBER) {
    return '/user';
  }
  if (role === ACCOUNT_TYPE_ADMIN) {
    return '/admin';
  }
  if (role === ACCOUNT_TYPE_SUPER_ADMIN) {
    return '/protected';
  }
  return '/';
};

export default getPath;
