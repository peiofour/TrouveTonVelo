const express = require('express');
const controller = require('../../helpers/controllers/stationsController');

const router = express.Router();

router.get('/', (request, response) => {
  controller.getAllStations();
  response.json('ok');
});

router.get('/:city', (request, response) => {
  const city = request.params.city;
  controller.getStationsForCity(city);
  response.json({ city });
});

module.exports = router;
