import faker from 'faker';

const user = () => ({
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  address: faker.fake('{{address.streetAddress}} {{address.state}}'),
  state: 2,
  phonenumber: faker.phone.phoneNumber('###########'),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: '123',
  repassword: '123'
});

export default user;
