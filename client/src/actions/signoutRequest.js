import { SIGNOUT_USER } from '../types';

const signout = () => ({
  type: SIGNOUT_USER,
});
export const signoutRequest = () => dispatch => dispatch(signout());
export default signoutRequest;
