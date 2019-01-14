const Distributor = require('../../models/Distributor');
const { shippingsHandler, transformData } = require('./merge');

/* eslint-disable */
module.exports = {
  distributors: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    try {
      const distributors = await Distributor.find();
      return distributors.map((distributor) => {
        return {
          ...distributor._doc,
          _id: distributor.id,
          password: null,
          shipList: shippingsHandler.bind(this, distributor.shipList),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createDistributor: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    const {
      email,
      firstName,
      lastName,
      password,
    } = ars.distributorInput;
    try {
      const isThereADistributor = await Distributor.findOne({
        email,
      });
      if (isThereADistributor) throw new Error('There is already a registered distributor with the same email.');
      const distributor = new Distributor({
        email,
        firstName,
        lastName,
        password,
      });
      const result = await distributor.save();
      return transformData(result);
    } catch (error) {
      throw error;
    }
  },
};
