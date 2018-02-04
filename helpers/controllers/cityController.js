const request = require('request');
const initDb = require('../../db/mongo');
const helper = require('../appHelper');

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

/**
 * Returns cities informations
 */
exports.getCitiesFromDatabase = () => {
    return new Promise((resolve, reject) => {
        db.collection('contracts').find().toArray((error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
};

/**
 * Update informations on cities
 */
exports.updateInfos = () => {
    const url = `${urlApi}contracts?&apiKey=${apiKey}`;

    // Request JCDECAUX API to get cities' name
    request(url, { json: true }, (error, response, body) => {
        if (error) { console.log(error); }

        body.forEach(city => {
            // Get station's infos for a city
            db.collection('stations').find({ 'body.contract_name': helper.capitalize(city.name) }).toArray((error, result) => {
                if (error) { console.log(error); }
                let stationCounter = 0;
                let bikesCounter = 0;
                let bankingCounter = 0;

                result.forEach(element => {
                    stationCounter++;
                    bikesCounter += element.body.bike_stands;
                    if(element.body.banking) {
                        bankingCounter++;
                    }
                });

                const object = {
                    city: city.name,
                    stationCounter: stationCounter,
                    bikesCounter: bikesCounter,
                    bankingCounter: bankingCounter
                };

                // Delete old data
                db.collection('contracts').deleteOne({ city: city.name }, (err, res) => {
                    if (err) throw err;

                    // Insert new data
                    db.collection('contracts').insertOne(object, (err, res) => {
                    if (err) throw err;
                    });
                });
            });
        });
    });
};