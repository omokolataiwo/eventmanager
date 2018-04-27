/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
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
      .setValue('#username', 'adeoye')
      .clearValue('#password')
      .setValue('#password', '123')
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'BOOKED EVENTS');
  },
  'User should be able to create event': browser => {
    browser
      .click('.create')
      .assert.urlEquals(`${APP_BASE_PATH}/user/event`)
      .setValue('#title', 'Rondy Event Center')
      .click('#startDate')
      .click('.picker__nav--next')
      .click('tr:nth-child(2) td:nth-child(1)')
      .click('.btn-flat.picker__close.waves-effect')
      .pause(1000)
      .click('#endDate')
      .useXpath()
      .click('//div[@aria-controls="endDate_table"][2]')
      .click('//table[@id="endDate_table"]//tr[2]/td[2]')
      .click('//div[@id="endDate_root"]//button[3]')
      .pause(1000)
      .click('//form/button');
  },
  'User should be able to edit an event': browser => {
    browser
      .useCss()
      .waitForElementVisible('.event-actions span', 1000)
      .click('.event-actions span')
      .assert.urlEquals(`${APP_BASE_PATH}/user/event/update/9`)
      .assert.value('#title', 'Rondy Event Center')
      .clearValue('#title')
      .setValue('#title', 'Rondy Event Place')
      .click('#startDate')
      .click('.picker__nav--next')
      .click('tr:nth-child(2) td:nth-child(1)')
      .click('.btn-flat.picker__close.waves-effect')
      .pause(1000)
      .click('#endDate')
      .useXpath()
      .click('//div[@aria-controls="endDate_table"][2]')
      .click('//table[@id="endDate_table"]//tr[2]/td[2]')
      .click('//div[@id="endDate_root"]//button[3]')
      .pause(1000)
      .click('(//div[@class="event-center"])[3]')
      .pause(9000000)
      .click('//form/button')
      .end();
  }
};
