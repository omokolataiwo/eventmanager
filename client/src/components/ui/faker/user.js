import faker from 'faker';

export default function user() {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    address: faker.fake('{{address.streetAddress}} {{address.state}}'),
    state: 2,
    phonenumber: faker.phone.phoneNumber('###########'),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: '123',
    repassword: '123',
  };
}
