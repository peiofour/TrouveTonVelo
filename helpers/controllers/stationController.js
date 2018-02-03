const request = require('request');
const initDb = require('../../db/mongo');

const MongoClient = require('mongodb').MongoClient;

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

/**
 * Get station's informations from the database
 * @param {string} id : contractName_number (e.g. Valance_3)
 * @param {object} start { "year": Integer,  "month": Integer,  "day": Integer,  "hour": Integer,  "minute": Integer }
 * @param {object} end { "year": Integer,  "month": Integer,  "day": Integer,  "hour": Integer,  "minute": Integer }
 */
exports.getStationAllFromDataBase = (id, start, end) => {
  return new Promise((resolve, reject) => {

  // Create Dates Objects
  // Month in date begins at 0 (e.g. January = 0)
  const startDate = new Date(Date.UTC(start.year, (start.month - 1), start.day, (start.hour), start.minute));
  // To avoid issue, we search for the entire minute, that's why we add 59 seconds
  const endDate = new Date(Date.UTC(end.year, (start.month - 1), end.day, (end.hour), end.minute, 59));


    // Get the station we are looking for
    db.collection('stations').find({ _id: id }).toArray((error, resultInfos) => {
      if (error) { reject(error); }

      // Get the historical on the station we are looking for
      db.collection('historical').find({stationId: id, 'date.timestamp': { $gte:startDate, $lte: endDate }}).toArray((error, resultHistorical) => {
        if (error) { reject(error); }

        // Object that we are going to return
        const station = {
          infos: resultInfos,
          historical: resultHistorical
        };

        resolve(station);
      });
    });
  });
};

/**
 * Get only the informations of one station based on its ID
 * @param {string} id : contractName_number (e.g. Valance_3)
 */
exports.getStationInfosFromDataBase = (id) => {
  return new Promise((resolve, reject) => {
    db.collection('stations').find({ _id: id }).toArray((error, resultInfos) => {
      if (error) { reject(error); }
      resolve(resultInfos);
    });
  });
};

exports.addStationToDataBase = (id, contract) => {
  const url = `${urlApi}stations/${id}?contract=${contract}&apiKey=${apiKey}`;

  request(url, { json: true }, (error, response, body) => {
    if (error) { console.log(error); }

    db.collection('stations').insertOne(body, (err, res) => {
      if (err) throw err;
    });
  });
};

exports.updateStationInfos = (id, contract) => {
  const url = `${urlApi}stations/${id}?contract=${contract}&apiKey=${apiKey}`;
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (error, response, body) => {
      if (error) { reject(error); }
      resolve(body);
    });
  });
};
