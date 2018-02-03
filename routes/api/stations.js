const express = require('express');
const controller = require('../../helpers/controllers/stationsController');

const router = express.Router();

router.get('/', async (request, response) => {
  async function getStations() {
    try {
      const body = await controller.getAllStations();
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations());
});

router.get('/:city', async (request, response) => {
  const city = request.params.city;

  async function getStations() {
    try {
      const body = await controller.getStationsForCity(city);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations(city));
});

router.get('/bank/boolean/:value', async (request, response) => {
  const bool = JSON.parse(request.params.value);

  async function getStations(bool) {
    try {
      const body = await controller.getStationsWithBank(bool);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations(bool));
});

router.get('/bank/:city', async (request, response) => {
  const city = request.params.city;

  async function getStations() {
    try {
      const body = await controller.getStationsWithBankForCity(city);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations(city));
});

router.get('/historical/:what', async (request, response) => {
  const what = request.params.what;

  async function getStations(type, period) {
    try {
      const body = await controller.getHistoricalOfStationForPeriod(type, period);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations(what, request.query));
});

module.exports = router;
