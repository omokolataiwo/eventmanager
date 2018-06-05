/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(5000);
  },
  'Signin as Center Owner': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .click('.signin')
      .clearValue('#username')
      .setValue('#username', 'user')
      .clearValue('#password')
      .setValue('#password', '123')
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'Booked Events');
  },
  'User able to edit their profile': browser => {
    browser
      .click('.profile')
      .clearValue('#firstName')
      .setValue('#firstName', 'Olaoye')
      .clearValue('#email')
      .setValue('#email', 'olaoye@gmail.com')
      .click('.btn.blue')
      .pause(5000)
      .end();
  }
};
