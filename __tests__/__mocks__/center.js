export const defaultCenter = {
  center: {},
  errors: {},
  action: {
    createCenter: 'CREATING_NEW_CENTER',
    updateCenter: 'UPDATING_CENTER'
  }
};

export const center = {
  id: 1,
  name: 'Sheba Center',
  address: '1 Olaoluwa street',
  area: 'Agege',
  facilities: 'Camera, Stage',
  image: 'default_image',
  type: 1,
  amount: 300000,
  capacity: 400,
  state: 26,
  active: 1
};

export const centers = [
  center,
  { ...center, id: 2, name: 'Immaculate Garden' }
];

export const contact = {
  firstName: 'Amosu',
  lastName: 'Segun',
  email: 'as@yahoo.com',
  phoneNumber: '08032839883'
};

export const contacts = [contact, contact];
