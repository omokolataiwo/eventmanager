/* global describe it expect */
import getPath from '../../client/src/utils/getPath';
import {
  ACCOUNT_TYPE_MEMBER,
  ACCOUNT_TYPE_ADMIN,
  ACCOUNT_TYPE_SUPER_ADMIN
} from '../../client/src/consts';

describe('Get appropriate path base on account type', () => {
  it('get path for user', () => {
    expect(getPath(ACCOUNT_TYPE_MEMBER)).toEqual('/user');
  });
  it('get path for admin', () => {
    expect(getPath(ACCOUNT_TYPE_ADMIN)).toEqual('/admin');
  });
  it('get path for super admin', () => {
    expect(getPath(ACCOUNT_TYPE_SUPER_ADMIN)).toEqual('/protected');
  });
  it('any other path should be base url', () => {
    expect(getPath('OTHERS')).toEqual('/');
  });
});
