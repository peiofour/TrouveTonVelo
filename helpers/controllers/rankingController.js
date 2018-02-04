const request = require('request');
const initDb = require('../../db/mongo');

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

                // Insert data into ranking collection
                db.collection('ranking').insertOne(object, (er, res) => {
                    if (er) throw er;
                });
            });
        });
    });
};