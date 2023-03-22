import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = Schema(
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

const User = model('User', userSchema);

export default User;
