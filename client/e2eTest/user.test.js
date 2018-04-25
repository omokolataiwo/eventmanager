/* eslint-disable no-unused-expressions */

module.exports = {
  'User should be able to sign up': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:8080/')
      .assert.visible('#how_it_works')
      .click('.signup')
      .waitForElementVisible('.col > h5', 1000)
      .assert.containsText('.col > h5', 'CREATE ACCOUNT')
      .setValue('#firstName', 'Adeoye')
      .setValue('#lastName', 'Taiwo')
      .setValue('#phoneNumber', '1234567891')
      .setValue('#email', 'adeoyetaiwo@yahoo.com')
      .setValue('#username', 'adeoye')
      .setValue('#password', '123')
      .setValue('#matchPassword', '123')
      .useXpath()
      .click('//div[3]/div[2]/div')
      .waitForElementVisible('//div[3]/div[2]/div/ul/li[2]', 2000)
      .click('//div[3]/div[2]/div/ul/li[2]')
      .useCss()

      .click('.blue')
      .pause(2000);
  },
  'User can not sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:8080/')
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
  'User should be able to sign in': (browser) => {
    browser
      .clearValue('#username')
      .setValue('#username', 'adeoye')
      .clearValue('#password')
      .setValue('#password', '123')
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'BOOKED EVENTS');
  },
  'User should be able to create event': (browser) => {
    browser
      .click('.create')
      .assert.urlEquals('http://localhost:8080/user/event')
      .setValue('#title', 'Rondy Event Center')
      .click('#startDate')
      .click('.picker__nav--next')
      .click('tr:nth-child(3)')
      .pause(900000)
      .end();
  }
};
