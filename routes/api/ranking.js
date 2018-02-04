const express = require('express');
const controller = require('../../helpers/controllers/rankingController');

const router = express.Router();

router.get('/city/:city', async (request, response, next) => {
  const city = request.params.city;

  async function getRank(city) {
    try {
      const body = await controller.getRankForCity(city);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getRank(city));
});

router.get('/global', async (request, response, next) => {
  async function getAll() {
    try {
      const body = await controller.getRank();
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getAll());
});

router.get('/station/:id', async (request, response, next) => {
  const id = request.params.id;

  async function getStation(id) {
    try {
      const body = await controller.getRankForStation(id);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await getStation(id));
});

module.exports = router;
