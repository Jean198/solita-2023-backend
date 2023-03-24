const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');

const {
  getStations,
  createStation,
  getSingleStationInfo,
  updateStation,
} = require('../controllers/stationController');

router.get('/getstations', getStations);
router.post('/createstation', createStation);
router.get('/getstation/:id', getSingleStationInfo);
router.patch('/updatestation/:id', updateStation);

module.exports = router;
