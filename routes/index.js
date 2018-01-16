var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/stations', function(req, res, next) {
  res.json({url: 'Station'});
});

// Récupérer les infos d'une station
router.get('/station/infos/:id', function(req, res, next) {
    const id = req.params.id;
    res.json({id: id});
});

router.get('/station/:city', function(req, res, next) {
    const city = req.params.city;
    res.json({city: city});
});

router.get('/station/historical/:id', function(req, res, next) {
    const id = req.params.id;
    res.json({id: id});
});

router.get('/ranking/:city', function(req, res, next) {
    const city = req.params.city;
    res.json({city: city});
});

router.get('/ranking/global', function(req, res, next) {
    res.json({url: '/ranking/global'});
});

module.exports = router;
