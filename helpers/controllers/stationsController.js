const request = require('request');
const initDb = require('../../db/mongo');

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

/**
 * Update Stations and Historical Collections
 */
exports.UpdateStationsListFromApi = () => {
  const url = `${urlApi}stations?&apiKey=${apiKey}`;

  // Get MongoDB connction Instance
  initDb((db) => {
    global.db = db;

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

        // Create an object that contains all the data we need in the historical collection
        const stationObject = {
          stationId: station._id,
          status: station.body.status,
          bike_stands: station.body.bike_stands,
          available_bike_stands: station.body.available_bike_stands,
          available_bikes: station.body.available_bikes,
          date: Date.now()
        };

        // Insert data into historical collection
        db.collection('historical').insertOne(stationObject, (err, res) => {
          if (err) throw err;
        });
      };
    });
  });
};

exports.getAllStations = () => {};
exports.getStationsForCity = (city) => {};