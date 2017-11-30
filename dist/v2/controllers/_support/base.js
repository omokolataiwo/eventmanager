'use strict';

module.exports = {
  toValidatorString: function toValidatorString(field) {
    return field ? '' + field : '';
  },

  isValidDate: function isValidDate(dateString) {
    // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) {
      return false;
    }

    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
      return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) {
      monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
  }
};