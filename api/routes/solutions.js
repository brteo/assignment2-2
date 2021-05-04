const express = require('express');
const solutions = require('../controllers/solutions');
// const { body, param } = require('express-validator');

const router = express.Router();

router.get('/', solutions.getTrainSolutions);

module.exports = router;
