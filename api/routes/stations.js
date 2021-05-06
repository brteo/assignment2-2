const express = require('express');
const stations = require('../controllers/stations');

const router = express.Router();

router.get('/arrivals/:id', stations.getRealTimeStationArrivals);

router.get('/departures/:id', stations.getRealTimeStationDepartures);

module.exports = router;
