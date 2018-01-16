const express = require('express');
const controller = require('../../helpers/controllers/stationsController');

const router = express.Router();

router.get('/:city', (request, response, next) => {
  const city = request.params.city;
  response.json({ city });
});
