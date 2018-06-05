/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(5000);
  },
  'Signin as user': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .click('.signin')
      .clearValue('#username')
      .setValue('#username', 'adeoye')
      .clearValue('#password')
      .setValue('#password', '123')
      .click('.signinBtn')
      .waitForElementVisible('.col.m12 > h4', 1000)
      .assert.containsText('.col.m12 > h4', 'Booked Events');
  },
  'User should be able to create event': browser => {
    browser
      .click('.create')
      .assert.urlEquals(`${APP_BASE_PATH}/user/event`)
      .pause(2000)
      .setValue('#title', 'Rondy Birthday Party')
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
      .click('//button[@class="btn blue right"]');
  },
  'User should be able to edit an event': browser => {
    browser
      .waitForElementVisible(
        '(//div[@class="card-panel event-card-user"])[1]/h6/i[2]',
        1000
      )
      .click('(//div[@class="card-panel event-card-user"])[1]/h6/i[2]')
      .useCss()
      .waitForElementVisible('#title', 1000)
      .assert.value('#title', 'Rondy Birthday Party')
      .clearValue('#title')
      .setValue('#title', 'Rondy Birthday')
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
      .click('(//div[@class="event-center card"])[3]')
      .click('//button[@class="btn blue right"]')
      .pause(5000)
      .end();
  }
};
