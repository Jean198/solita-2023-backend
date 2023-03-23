const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/isloggedin', loginStatus);

module.exports = router;
