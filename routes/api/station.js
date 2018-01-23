const express = require('express');
const controller = require('../../helpers/controllers/stationController');

const router = express.Router();

router.get('/:contract/:id', async (request, response) => {
  const id = request.params.id;

  async function test(id) {
    try {
      const body = await controller.stationInfos(id);
      return body;
    } catch (e) {
      return e;
    }
  }

  response.json(await test(id));
});

router.put('/:contract/:id', async (request, response) => {
  const id = request.params.id;
  const contract = request.params.contract;

  controller.addStationToDataBase(id, contract);

  response.json('ok');
});

module.exports = router;
