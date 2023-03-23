const express = require('express');
const router = express.Router();
const { getAllTrips } = require('../controllers/tripController');

router.get('/gettrips', getAllTrips);

module.exports = router;
