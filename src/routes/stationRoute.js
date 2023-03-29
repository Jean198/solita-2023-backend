const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');

const {
  getStations,
  createStation,
  getSingleStationInfo,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');

router.get('/getstations', getStations);
router.post('/createstation', protectRoute, createStation);
router.get('/getstation/:id', getSingleStationInfo);
router.patch('/updatestation/:id', protectRoute, updateStation);
router.delete('/deletestation/:id', protectRoute, deleteStation);

module.exports = router;
