const express = require('express');
const controller = require('../../helpers/controllers/cityController');

const router = express.Router();

router.get('/all', async (request, response, next) => {

    async function getCities() {
      try {
        const body = await controller.getCitiesFromDatabase();
        return body;
      } catch (e) {
        return e;
      }
    }

    response.json(await getCities());
});

router.get('/single/:name', async (request, response, next) => {
    const name = request.params.name;

    async function getCity(city) {
      try {
        const body = await controller.getCityFromDatabase(city);
        return body;
      } catch (e) {
        return e;
      }
    }

    response.json(await getCity(name));
});

module.exports = router;