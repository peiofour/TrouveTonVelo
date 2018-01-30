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

router.post('/historical/:id', async (request, response) => {
  const id = request.params.id;

  const startPeriod = {
    year: request.body.start.year,
    month: request.body.start.month,
    day: request.body.start.day,
    hour: request.body.start.hour,
    minute: request.body.start.minute
  }
  const endPeriod = {
    year: request.body.end.year,
    month: request.body.end.month,
    day: request.body.end.day,
    hour: request.body.end.hour,
    minute: request.body.end.minute
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
