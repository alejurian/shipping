const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {
  transformData,
} = require('./merge');

/* eslint-disable */
module.exports = {
  users: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    try {
      const users = await User.find();
      return users.map((user) => {
        return transformData(user);
      });
    } catch (error) {
      throw error;
    }
  },
  createUser: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    const {
      email,
      firstName,
      lastName,
      password,
      type,
    } = ars.userInput;
    try {
      const isThereAUser = await User.findOne({
        email,
      });
      if (isThereAUser) throw new Error('There is already a registered user with the same email.');
      const user = new User({
        email,
        firstName,
        lastName,
        password,
        type,
      });
      const result = await user.save();
      return transformData(result);
    } catch (error) {
      throw error;
    }
  },
  login: async ({
    email,
    password,
  }, req) => {
    if (req.isAuth) throw new Error('You have already logged in');
    const user = await User.findOne({
      email,
    });
    if (!user) throw new Error('The user is not registered.');
    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual) throw new Error('The email or password is incorrect.');
    const token = jwt.sign({
        userId: user.id,
        email: user.email,
      },
      'mySuperSecretKey', {
        expiresIn: '1h',
      },
    );
    return {
      userId: user.id,
      token,
      tokenExpiration: 1,
    };
  },
};
