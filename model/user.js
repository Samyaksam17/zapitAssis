const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
  api_key: {
    type: String,
    trim: true,
    required: true,
  },
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("user", UserSchema);

// create user
const createUser = (newUser, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      User.create(newUser, callback);
    });
  });
};

// get single user
const getSingleUser = (query, callback) => {
  User.findOne(query, callback);
};

// Compare Password
const comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, function (err, isMatch) {
    console.log(password);
    console.log(hash);
    // if (err) throw err;
    callback(null, isMatch);
  });
};

// get all users
const getUsers = (query, callback) => {
  User.find(query, callback);
};

// user by id
const userById = function (query, callback) {
  User.findById(query, callback);
};

// update user
const updateUser = (query, data, options, callback) => {
  User.findOneAndUpdate(query, data, options, callback);
};

// delete user
const removeUser = (query, callback) => {
  User.remove(query, callback);
};

module.exports = {
  User,
  createUser,
  getSingleUser,
  comparePassword,
  getUsers,
  userById,
  updateUser,
  removeUser,
};
