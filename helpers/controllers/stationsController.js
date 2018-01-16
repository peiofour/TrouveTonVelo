const request = require('request');

const apiKey = process.env.API_JCD;
const urlApi = 'https://api.jcdecaux.com/vls/v1/';

exports.stationsList = () => {
  const url = `${urlApi}stations?&apiKey=${apiKey}`;
  request({
    uri: url,
    method: 'GET',
    timeout: 10,
    followRedirect: true,
    maxRedirects: 10,
  }, (error, response, body) => {
    console.log(body);
  });
};

