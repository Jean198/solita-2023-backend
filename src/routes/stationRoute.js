const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');

const {
  getStations,
  createStation,
} = require('../controllers/stationController');

router.get('/getstations', getStations);
router.post('/createstation', createStation);

module.exports = router;
