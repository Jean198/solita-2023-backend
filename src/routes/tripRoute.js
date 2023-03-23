const express = require('express');
const router = express.Router();
const {
  getAllTrips,
  createTrip,
  getSingleTrip,
} = require('../controllers/tripController');

router.get('/gettrips', getAllTrips);
router.get('/gettrip/:id', getSingleTrip);
router.post('/createtrip', createTrip);

module.exports = router;
