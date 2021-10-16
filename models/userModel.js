const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Task = require('./taskModel');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: [3, 'name must be greater than 3 character'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'Invalid email'],
    required: [true, 'User must have an email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: [6, 'Password length must be greater than 6 character'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'user must have a password Confirm'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'Password and passwordConfirm must be same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
