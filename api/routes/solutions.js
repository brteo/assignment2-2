const express = require('express');
const solutions = require('../controllers/solutions');
// const { body, param } = require('express-validator');

const router = express.Router();

router.get('/', solutions.getTrainSolutions);

router.get('/:id', solutions.getTrainSolutionById);

module.exports = router;
