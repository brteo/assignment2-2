const express = require('express');
const stations = require('../controllers/stations');

const router = express.Router();

router.get('/:id', stations.getRealTimeStationInfo);

module.exports = router;
