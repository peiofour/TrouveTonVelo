const express = require('express');
const controller = require('../../helpers/controllers/rankingController');

const router = express.Router();

router.get('/:city', async (request, response, next) => {
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

router.get('/global', (request, response, next) => {
  response.json({ url: '/ranking/global' });
});

module.exports = router;
