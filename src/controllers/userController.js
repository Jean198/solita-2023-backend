const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const cookie = require('cookie');
const { generateToken } = require('../services/user');

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

//Login User----------------------------------------------------------------------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //Validate request
  if (!username || !password) {
    res.status(400);
    throw new Error('Both username and password are required!');
  }
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error('Incorrect username or Password');
  }

  //If user found, check if password is correct!
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) {
    // Generate Token
    const token = generateToken(user._id);

    //Send Http-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //sameSite: 'none', // disabling this helped to get the cookie in the browser
      // secure: true,
    });
    const { _id, name, username } = user;
    res.status(200).json({
      id: _id,
      name,
      username,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Incorrect username or Password');
  }
});

//-----------------------------------------------------------------------------------------------------------------------

module.exports = {
  registerUser,
  loginUser,
};
