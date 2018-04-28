/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  'User should be able to sign in': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('#how_it_works')
      .click('.signin')
      .setValue('#username', 'admin')
      .setValue('#password', '123')
      .click('.signinBtn')
      .waitForElementVisible('.container-medium.index > h5', 1000)
      .assert.containsText(
        '.container-medium.index > h5',
        'MOST RECENT EVENTS'
      );
  },
  'User should be able to create center': browser => {
    browser
      .click('.create')
      .setValue('#password', '123')
      .setValue('#matchPassword', '123')
      .pause(9000000)
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'BOOKED EVENTS');
  }
};
