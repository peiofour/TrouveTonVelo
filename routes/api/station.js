const express = require('express');
const controller = require('../../helpers/controllers/stationController');

const router = express.Router();

router.get('/infos/:id', async (request, response) => {
  const id = request.params.id;

  async function getStation(id) {
    try {
      const body = await controller.getStationInfosFromDataBase(id);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStation(id));
});
/**
 * Gets historical of one station based on its ID
 * @param {string} id : contractName_number (e.g. Valence_3)
 * &?
 * start
 * @param {string} syear :  year (ex : syear=2018 )
 * @param {string} smonth :  month (ex : smonth=2 )
 * @param {string} sday :  day (ex : sday=17 )
 * @param {string} shour :  hour (ex : shour=12 )
 * @param {string} sminute :  minute (ex : sminute=15 )
 * end
 * @param {string} eyear :  year (ex : eyear=2018 )
 * @param {string} emonth :  month (ex : emonth=20 )
 * @param {string} eday :  day (ex : eday=2 )
 * @param {string} ehour :  hour (ex : ehour=10 )
 * @param {string} eminute :  minute (ex : eminute=20 )
 */
router.get('/historical/:id', async (request, response) => {
  const id = request.params.id;

  const startPeriod = {
    year: parseInt(request.query['syear']),
    month: parseInt(request.query['smonth']),
    day: parseInt(request.query['sday']),
    hour: parseInt(request.query['shour']),
    minute: parseInt(request.query['sminute'])
  }
  const endPeriod = {
    year: parseInt(request.query['eyear']),
    month: parseInt(request.query['emonth']),
    day: parseInt(request.query['eday']),
    hour: parseInt(request.query['ehour']),
    minute: parseInt(request.query['eminute'])
  }

  async function getStation(id) {
    try {
      const body = await controller.getStationAllFromDataBase(id, startPeriod, endPeriod);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStation(id));

});



module.exports = router;
