const express = require('express');
const trains = require('../controllers/trains');

const router = express.Router();

router.get('/:id', trains.getRealTimeTrainInfo);

module.exports = router;
