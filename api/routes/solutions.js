const express = require('express');
const solutions = require('../controllers/solutions');

const router = express.Router();

router.get('/', solutions.getTrainSolutions);

router.get('/:id', solutions.getTrainSolutionById); // deprecated

module.exports = router;
