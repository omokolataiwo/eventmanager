/* eslint-disable no-unused-expressions */
const path = require('path');

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(3000);
  },
  "after": browser => {
    browser.pause(9000);
  },
  'Signin as Center Owner': browser => {
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
  'User should be able to cancel an event': browser => {
    browser
      .useXpath()
      .waitForElementVisible(
        '(//div[@class="card-panel event-card-user"])[1]/h6/i[1]',
        1000
      )
      .click('(//div[@class="card-panel event-card-user"])[1]/h6/i[1]')
      .useCss()
      .waitForElementVisible('.modal-action.red', 500)
      .pause(2000)
      .click('.modal-action.red');
  },
  'Center owner should be able to cancel an event': browser => {
    browser
      .click('.signout')
      .click('.signin')
      .clearValue('#username')
      .setValue('#username', 'admin')
      .clearValue('#password')
      .setValue('#password', '123')
      .click('.signinBtn')
      .pause(1000)
      .click('.centers a')
      .useXpath()
      .waitForElementVisible('//ul[@class="pagination"]/li[2]/div', 2000)
      .click('//ul[@class="pagination"]/li[2]/div')
      .waitForElementVisible(
        '//div[@class="row event-center-detailed"]//div[@class="btn blue"][2]',
        2000
      )
      .click('//div[@class="row event-center-detailed"]//div[@class="btn blue"][2]')
      .waitForElementVisible(
        '(//div[@class="card-panel event-card-admin"])[1]//i',
        500
      )
      .pause(5000)
      .click('(//div[@class="card-panel event-card-admin"])[1]//i')
      .useCss()
      .waitForElementVisible('.modal-action.red', 500)
      .click('.modal-action.red')
      .pause(5000)
      .end();
  }
};
