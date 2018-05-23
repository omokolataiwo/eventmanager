/* global describe it expect */
import { addFlash, getFlash, hasFlash } from '../../client/src/utils/flash';

describe('Store data in localstorage for one time use', () => {
  it('add data to localstorage', () => {
    addFlash('CENTER_CREATED', true);
    expect(hasFlash('CENTER_CREATED')).toBeTruthy();
  });
  it('can not get value that is not in storage', () => {
    expect(hasFlash('NON_EXISTING_KEY')).toBeFalsy();
  });
  it('remove data from storage once used', () => {
    addFlash('PREFERRED_URL', 'admin@localhost');
    expect(getFlash('PREFERRED_URL')).toEqual('admin@localhost');
    expect(hasFlash('PREFERRED_URL')).toBeFalsy();
  });
});
