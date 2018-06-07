/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(5000);
  },
  'User should be able to sign up': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('#how_it_works')
      .click('.signup')
      .waitForElementVisible('.col > h5', 1000)
      .assert.containsText('.col > h5', 'CREATE ACCOUNT')
      .setValue('#firstName', 'Adeoye')
      .setValue('#lastName', 'Taiwo')
      .setValue('#phoneNumber', '12345678910')
      .setValue('#email', 'adeoyetaiwo@yahoo.com')
      .setValue('#username', 'adeoye')
      .setValue('#password', '123')
      .setValue('#matchPassword', '123')
      .useXpath()
      .click('//div[3]/div[2]/div')
      .waitForElementVisible('//div[3]/div[2]/div/ul/li[2]', 2000)
      .click('//div[3]/div[2]/div/ul/li[2]')
      .useCss()
      .pause(2000)
      .click('.blue')
      .pause(2000)
      .end();
  }
};
