const request = require('request');
const initDb = require('../../db/mongo');

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

exports.addStationToDataBase = (id, contract) => {
  const url = `${urlApi}stations/${id}?contract=${contract}&apiKey=${apiKey}`;
  initDb((db) => {
    global.db = db;
    request(url, { json: true }, (error, response, body) => {
      if (error) { console.log(error); }

      db.collection('stations').insertOne(body, (err, res) => {
        if (err) throw err;
      });
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
