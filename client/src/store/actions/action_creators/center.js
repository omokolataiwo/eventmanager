import { REQUEST_CREATE_CENTER, CREATE_CENTER } from '../consts';

export const requestCreateCenter = () => ({ type: REQUEST_CREATE_CENTER });

export const CreateCenter = center => ({
  type: CREATE_CENTER,
  center,
});
