const express = require('express');
const controller = require('../../helpers/controllers/stationController');

const router = express.Router();

router.get('/', (request, response, next) => {
  response.json({ url: 'Station' });
});

router.get('/infos/:id', (request, response, next) => {
  const id = request.params.id;
  response.json({ id });
});

router.get('/historical/:id', (request, response, next) => {
  const id = request.params.id;
  response.json({ id });
});
