/* eslint-disable no-unused-expressions */

const APP_BASE_PATH = 'http://localhost:8080';

module.exports = {
  "beforeEach": browser => {
    browser.pause(5000);
  },
  'User should be able to search for center and get center details': browser => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('#how_it_works')
      .setValue('.search-cover .row:nth-child(2) input', 'knig')
      .pause(3000)
      .click('.search-cover button')
      .pause(500)
      .click('.event-center.card:nth-child(1)')
      .pause(500)
      .assert.containsText('.details h3', 'Knightbridge Hotels Big Hall')
      .pause(5000)
      .end();
  }
};
