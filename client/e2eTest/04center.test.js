/* eslint-disable no-unused-expressions */
const path = require('path');

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(1000);
  },
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
      .waitForElementVisible('.container-medium > h5', 1000)
      .assert.containsText('.container-medium > h5', 'MOST RECENT EVENTS');
  },
  'User should be able to create center': browser => {
    browser
      .click('.create')
      .useXpath()
      .click('//form/div[1]/div[2]')
      .waitForElementVisible('//form/div[1]/div[2]/div/ul/li[2]', 1000)
      .click('//form/div[1]/div[2]/div/ul/li[2]')
      .waitForElementVisible('//form/div[3]/div[1]', 2000)
      .click('//form/div[3]/div[1]')
      .waitForElementVisible('//form/div[3]/div[1]/div/ul/li[26]', 2000)
      .click('//form/div[3]/div[1]/div/ul/li[26]')
      .useCss()
      .setValue('#name', 'Army Court')
      .setValue('#address', 'Cantonment Barracks, Onigbongbo')
      .setValue('#area', 'Ikeja')
      .setValue('#capacity', '4500')
      .setValue('#amount', '2000000')
      .setValue(
        '#details',
        'Want to have fun in a secure environment? Army Court is the place for you.'
      )
      .click('.chips.facilities')
      .keys('Security')
      .keys(browser.Keys.ENTER)
      .keys('Beautiful Views')
      .keys(browser.Keys.ENTER)
      .setValue('.chips.facilities', ['nightwatch', browser.Keys.ENTER])
      .click('#new-contact+.lever')
      .setValue('#firstName', 'Mathew')
      .setValue('#lastName', 'Raphael')
      .setValue('#phoneNumber', '94328483841')
      .setValue('#email', 'mat_raph@gmail.com')
      .waitForElementVisible('input#image', 1000)
      .setValue('input#image', path.resolve(`${__dirname}/tour.png`))
      .click('input[type="submit"]')
      .pause(9000)
      .assert.containsText('h5', 'New Center Created.');
  },
  'User should be able to edit center': browser => {
    browser
      .waitForElementVisible('.centers a', 2000)
      .click('.centers a')
      .pause(500)
      .useXpath()
      .waitForElementVisible('(//div[@class="event-center card"])[1]', 2000)
      .click('(//div[@class="event-center card"])[1]')
      .click('//div[@class="row event-center-detailed"]//div[@class="btn blue"][1]')
      .waitForElementVisible('//form/div[1]/div[2]', 2000)
      .click('//form/div[1]/div[2]')
      .waitForElementVisible('//form/div[1]/div[2]/div/ul/li[2]', 1000)
      .click('//form/div[1]/div[2]/div/ul/li[2]')
      .waitForElementVisible('//form/div[3]/div[1]', 2000)
      .click('//form/div[3]/div[1]')
      .waitForElementVisible('//form/div[3]/div[1]/div/ul/li[26]', 2000)
      .click('//form/div[3]/div[1]/div/ul/li[26]')
      .useCss()
      .clearValue('#amount')
      .setValue('#amount', '3000000')
      .click('.input.input')
      .keys('Cars')
      .keys(browser.Keys.ENTER)
      .click('#new-contact+.lever')
      .setValue('#firstName', 'Rolland')
      .setValue('#lastName', 'Ayeni')
      .setValue('#phoneNumber', '94328383841')
      .setValue('#email', 'rol@gmail.com')
      .click('input[type="submit"]')
      .pause(5000)
      .end();
  }
};
