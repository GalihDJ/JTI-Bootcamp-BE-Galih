const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// ---------------------------------------------------------------------------
// api router
// ---------------------------------------------------------------------------

const bootcampController = require('./bootcamp/index');
router.use('/bootcamp', bootcampController);

const foodController = require('./food/index');
router.use('/food', foodController);

module.exports = router;