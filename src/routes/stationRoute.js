const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');

const { getStations } = require('../controllers/stationController');

router.get('/getstations', getStations);

module.exports = router;
