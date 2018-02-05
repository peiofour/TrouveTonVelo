const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('wiki');
});

router.get('/controllers', function(req, res) {
    res.render('controllers');
});

router.get('/routes', function(req, res) {
    res.render('routes');
});

router.get('/helpers', function(req, res) {
    res.render('helpers');
});

router.get('/crons', function(req, res) {
    res.render('crons');
});

module.exports = router;
