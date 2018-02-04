const request = require('request');

/**
 * Return an object to create date
 * @param {string} type
 * @param {object} period
 */
exports.getPeriod = (type, period) => {
    let time;
  const month = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (type == 'year') {
    time = {
      startYear: period.year,
      startMonth: 0,
      startDay: 1,
      startHour: 0,
      endYear: period.year,
      endMonth: 11,
      endDay: 31,
      endHour: 23
    };
  } else if (type == 'month') {
    time = {
      startYear: period.year,
      startMonth: (period.month - 1),
      startDay: 1,
      startHour: 0,
      endYear: period.year,
      endMonth: (period.month - 1),
      endDay: month[(period.month - 1)],
      endHour: 23
    };
  } else if (type == 'day') {
    time = {
      startYear: period.year,
      startMonth: (period.month - 1),
      startDay: period.day,
      startHour: 0,
      endYear: period.year,
      endMonth: (period.month - 1),
      endDay: period.day,
      endHour: 23
    };
  } else if (type == 'hour') {
    time = {
      startYear: period.year,
      startMonth: (period.month - 1),
      startDay: period.day,
      startHour: parseInt(period.hour) + 1,
      endYear: period.year,
      endMonth: (period.month - 1),
      endDay: period.day,
      endHour: parseInt(period.hour) + 1
    };
  }
  return time;
};

/**
 * Return the name with capital first letter
 * @param {string} name
 */
exports.capitalize = (name) => {
    return `${name.charAt(0).toUpperCase()}${name.substr(1)}`;
};