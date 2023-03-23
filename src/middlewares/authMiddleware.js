const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error('You must login to perform the action!');
  }

  //Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  //Get user id from token
  const user = await User.findById(verified.id).select('-password');
  if (!user) {
    res.status(401);
    throw new Error('Not authorised, please login!');
  }
  next();
});

module.exports = protectRoute;
