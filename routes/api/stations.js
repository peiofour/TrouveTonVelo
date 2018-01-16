const express = require('express');
const controller = require('../../helpers/controllers/stationsController');

const router = express.Router();

router.get('/', (request, response, next) => {
  controller.stationsList();
  response.json({ city: 'salut' });
});

router.get('/:city', (request, response, next) => {
  const city = request.params.city;
  response.json({ city });
});

module.exports = router;
