const request = require('request');
const initDb = require('../../db/mongo');
const helper = require('../appHelper');

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

/**
 * Update Stations and Historical Collections
 */
exports.UpdateStationsListFromApi = () => {
  const url = `${urlApi}stations?&apiKey=${apiKey}`;

  // Request JCDecaux API
  request(url, { json: true }, (error, response, body) => {
    const stations = body;
    if (error) { console.log(error); }

    for (const i in stations) {
      const station = {
        _id: `${stations[i].contract_name}_${stations[i].number}`,
        body: stations[i],
      };

      // Delete old data
      db.collection('stations').deleteOne({ _id: station._id }, (err, res) => {
        if (err) throw err;

        // Insert new data
        db.collection('stations').insertOne(station, (err, res) => {
          if (err) throw err;
        });
      });

      // Get the date of the time when this method is performed
      const d = new Date(Date.now());

      // Avoid to have this : 2018-01-28 17:30:02.320Z, Needed this : 2018-01-28 17:30:00.000Z
      const now = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0, 0);

      // Create an object that contains all the data we need in the historical collection
      const stationObject = {
        stationId: station._id,
        status: station.body.status,
        bike_stands: station.body.bike_stands,
        available_bike_stands: station.body.available_bike_stands,
        available_bikes: station.body.available_bikes,
        date: {
          year: now.getUTCFullYear(),
          month: now.getUTCMonth(),
          day: now.getUTCDate(),
          hour: now.getUTCHours(),
          minute: now.getUTCMinutes(),
          timestamp: now
        }
      };

      // Insert data into historical collection
      db.collection('historical').insertOne(stationObject, (err, res) => {
        if (err) throw err;
      });
    };
  });
};

/**
 * Return every stations informations (Not historical)
 */
exports.getAllStations = () => {
  return new Promise((resolve, reject) => {
    db.collection('stations').find().toArray((error, result) => {
      if (error) { reject(error); }
      resolve(result);
    });
  });
};

/**
 * Return every stations informations of a city (Not historical)
 * @param {string} city
 */
exports.getStationsForCity = (city) => {
  return new Promise((resolve, reject) => {
    db.collection('stations').find({ 'body.contract_name': helper.capitalize(city) }).toArray((error, result) => {
      if (error) { reject(error); }
      resolve(result);
    });
  });
};

/**
 * Return every stations informations with banking terminal (Not historical)
 * @param {boolean} bool
 */
exports.getStationsWithBank = (bool) => {
  return new Promise((resolve, reject) => {
    db.collection('stations').find({ 'body.banking': bool }).toArray((error, result) => {
      if (error) { reject(error); }
      resolve(result);
    });
  });
};

/**
 * Return every stations informations of a city with banking terminal (Not historical)
 * @param {string} city
 */
exports.getStationsWithBankForCity = (city) => {
  return new Promise((resolve, reject) => {
    db.collection('stations').find({ 'body.contract_name': helper.capitalize(city), 'body.banking': true }).toArray((error, result) => {
      if (error) { reject(error); }
      resolve(result);
    });
  });
};

/**
 * Get stations' historical for a specific period of time
 * @param {string} type  e.g. year|month|day|hour
 * @param {object} period
 */
exports.getHistoricalOfStationsForPeriod = (type, period) => {
  return new Promise((resolve, reject) => {
    const time = helper.getPeriod(type, period);
    const start = new Date(Date.UTC(time.startYear, time.startMonth, time.startDay, time.startHour, 0, 0, 0));
    const end = new Date(Date.UTC(time.endYear, time.endMonth, time.endDay, time.endHour, 59, 59, 0));
    db.collection('historical').find({ 'date.timestamp': { $gte: start, $lte: end } }).toArray((error, result) => {
      if (error) { reject(error); }
      resolve(result);
    });
  });
};
