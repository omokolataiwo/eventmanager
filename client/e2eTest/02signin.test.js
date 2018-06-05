/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(5000);
  },
  'User can not sign in with wrong credentials': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('#how_it_works')
      .click('.signin')
      .waitForElementVisible('.col > h5', 1000)
      .assert.containsText('.col > h5', 'SIGN IN')
      .setValue('#username', 'adeoye')
      .setValue('#password', '1233223')
      .click('.signinBtn')
      .waitForElementVisible('.error.signin > span', 1000)
      .assert.containsText(
        '.error.signin > span',
        'Invalid username or password'
      );
  },
  'User should be able to sign in': browser => {
    browser
      .clearValue('#username')
      .setValue('#username', 'user')
      .clearValue('#password')
      .setValue('#password', '123')
      .pause(3000)
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'Booked Events')
      .pause(3000)
      .end();
  }
};
