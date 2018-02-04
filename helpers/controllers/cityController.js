const request = require('request');
const initDb = require('../../db/mongo');
const helper = require('../appHelper');

exports.getCitiesFromDatabase = () => {
    return new Promise((resolve, reject) => {
        db.collection('contracts').find().toArray((error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
};
