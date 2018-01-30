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

router.get('/:city', (request, response) => {
  const city = request.params.city;
  controller.getStationsForCity(city);
  response.json({ city });
});

module.exports = router;
