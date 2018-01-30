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

router.get('/bank/', async (request, response) => {

  async function getStations() {
    try {
      const body = await controller.getStationsWithBank();
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStations());
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

module.exports = router;
