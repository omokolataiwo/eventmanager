import faker from 'faker';

export default function fakeCenter() {
  return {
    name: faker.company.name,
    capacity: faker.random.number,
    address: faker.fake('{{address.streetAddress}} {{address.state}}'),
    amount: 50000,
    facilities: 'Internet, Contact Power Supply, Projector',
    state: 26,
    type: 2,
    image: 'default_center_image.jpeg',
    contact: {
      newContact: {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber('###########'),
        email: faker.internet.email(),
      },
      existingContacts: [],
    },
  };
}
