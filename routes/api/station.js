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
 * @param {string} id : contractName_number (e.g. Valance_3)
 * &?
 * start
 * @param {string} syear :  year (ex : syear=2018 )
 * @param {string} smonth :  month (ex : smonth=2018 )
 * @param {string} sday :  day (ex : sday=2018 )
 * @param {string} shour :  hour (ex : shour=2018 )
 * @param {string} sminute :  minute (ex : sminute=2018 )
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
    year: request.query['syear'],
    month: request.query['smonth'],
    day: request.query['sday'],
    hour: request.query['shour'],
    minute: request.query['sminute']
  }
  const endPeriod = {
    year: request.query['eyear'],
    month: request.query['emonth'],
    day: request.query['eday'],
    hour: request.query['ehour'],
    minute: request.query['eminute']
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
