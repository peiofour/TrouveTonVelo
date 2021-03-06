const request = require('request');
const initDb = require('../../db/mongo');
const helper = require('../appHelper');

/**
 * Add informations on Stations for the ranking part like available bikes and places Rates
 * @param {Object} date
 */
exports.UpdateRank = (date) => {
    const end = date;
    const start = new Date(date);
    start.setDate(start.getDate() - 7);

    db.collection('stations').find({}, { _id: 1, body: 0}).toArray((error, result) => {
        if (error) { console.log(error); }
        result.forEach(station => {
            db.collection('historical').find({stationId: station._id, 'date.timestamp': { $gte:start, $lte: end }}).toArray((err, resultHistorical) => {
                if (err) { console.log(err); }

                let availableBikesRate = 0;
                let availablePlacesRate = 0;
                let n = 1;

                resultHistorical.forEach(element => {
                    availableBikesRate += (100 / element.bike_stands) * element.available_bikes;
                    availablePlacesRate += (100 / element.bike_stands) * element.available_bike_stands;
                    n++;
                });

                // Get average
                availableBikesRate = availableBikesRate / n;
                availablePlacesRate = availablePlacesRate / n;

                const object = {
                    stationId: station._id,
                    city: station.body.contract_name,
                    availableBikesRate: parseFloat(availableBikesRate.toFixed(2)),
                    availablePlacesRate: parseFloat(availablePlacesRate.toFixed(2)),
                    startDate: start,
                    endDate: end,
                };

                // Delete data because we only want the rank for the previous week
                db.collection('ranking').deleteOne({ stationId: station._id }, (e, res) => {
                    if (e) throw e;
                    // Insert data into ranking collection
                    db.collection('ranking').insertOne(object, (er, res) => {
                        if (er) throw er;
                    });
                });
            });
        });
    });
};

/**
 * Get ranking data for a specific city
 * @param {string} city
 */
exports.getRankForCity = (city) => {
    return new Promise((resolve, reject) => {
        db.collection('ranking').find({ city: helper.capitalize(city) }).toArray((error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
};

/**
 * Get ranking data for a specific station
 * @param {string} id
 */
exports.getRankForStation = (id) => {
    return new Promise((resolve, reject) => {
        db.collection('ranking').find({ stationId: helper.capitalize(id) }).toArray((error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
};

/**
 * Get ranking data for every station
 */
exports.getRank = () => {
    return new Promise((resolve, reject) => {
        db.collection('ranking').find().toArray((error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
};