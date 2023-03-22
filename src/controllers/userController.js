const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//Register user -----------------------------------------------------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  //Validation
  if (!name || !username || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be atleast to 6 characters');
  }

  //Check if user already exists
  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error('username has already been used');
  }

  //Create new user
  const user = await User.create({
    name: name,
    username: username,
    password: password,
  });
  //If user created, send back some info of him
  if (user) {
    const { _id, name, username } = user;
    res.status(201).json({
      id: _id,
      name,
      username,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  registerUser,
};
