const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');
const {
  getAllTrips,
  createTrip,
  getSingleTrip,
  deleteTrip,
  updateTrip,
} = require('../controllers/tripController');

router.get('/gettrips', getAllTrips);
router.get('/gettrip/:id', getSingleTrip);
router.delete('/deletetrip/:id', protectRoute, deleteTrip);
router.post('/createtrip', createTrip);
router.post('/updatetrip/:id', protectRoute, updateTrip);

module.exports = router;
