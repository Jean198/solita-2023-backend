const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },

    username: {
      type: String,
      rquired: [true, 'Please add a name username'],
      unique: true,
      trim: true, //Remove spaces
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: [6, 'Password must be minimum six characters'],
      //maxLength: [100, 'Password must not exceed 100 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
//Encrypt password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
