const express = require('express');
const controller = require('../../helpers/controllers/rankingController');

const router = express.Router();

router.get('/:city', (request, response, next) => {
  const city = request.params.city;
  response.json({ city });
});

router.get('/global', (request, response, next) => {
  response.json({ url: '/ranking/global' });
});
