const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

router.post('/registeruser', registerUser);

module.exports = router;
