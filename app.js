require('dotenv').config();

const express = require('express');
const path = require('path');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const initDb = require('./db/mongo');
const cron = require('node-cron');

const stations = require('./routes/api/stations');
const station = require('./routes/api/station');
const ranking = require('./routes/api/ranking');
const city = require('./routes/api/city');
const stationscontroller = require('./helpers/controllers/stationsController');
const rankingController = require('./helpers/controllers/rankingController');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/stations', stations);
app.use('/api/station', station);
app.use('/api/ranking', ranking);
app.use('/api/city', city);

initDb((db) => {
  global.db = db;

  db.createCollection('stations', (err, res) => {
    if (err) throw err;
  });

  db.createCollection('contracts', (err, res) => {
    if (err) throw err;
  });

  db.createCollection('ranking', (err, res) => {
    if (err) throw err;
  });

  db.createCollection('historical', (err, res) => {
    if (err) throw err;
  });

  cron.schedule('0 */30 * * * *', () => {
    const date = new Date(Date.now());
    console.log('running an update every 30 minutes : ', date.toString());
    stationscontroller.UpdateStationsListFromApi();
  });

  cron.schedule('0 0 19 * * 7', () => {
    const d = Date();
    const date = new Date(d.valueOf());
    console.log('running an update every Sundays at 6pm (UTC) : ', date.toString());

    rankingController.UpdateRank(date);
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.sendStatus(err.status || 500);
  });

  app.listen(process.env.NODE_PORT, () => {
    console.log(`API Velo-Toulouse -- Start sur le port ${process.env.NODE_PORT}`);
  });
});

module.exports = app;
