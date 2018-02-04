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

module.exports = router;