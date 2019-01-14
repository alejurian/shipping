const Shipping = require('../../models/Shipping');
const Client = require('../../models/Client');
const { clientHandler, distributorHandler } = require('./merge');

/* eslint-disable */
module.exports = {
  shippings: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    try {
      const shippings = await Shipping.find();
      return shippings.map((shipping) => {
        return {
          ...shipping._doc,
          _id: shipping.id,
          client: clientHandler.bind(this, shipping.client),
          distributor: distributorHandler.bind(this, shipping.distributor),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createShipping: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    const {
      name,
      price,
      currency,
      weight,
      chargeId,
      client,
    } = ars.shippingInput;
    try {
      const shipping = new Shipping({
        name,
        price,
        currency,
        weight,
        chargeId,
        client,
      });
      const clientFound = await Client.findById(client);
      if (!clientFound) throw new Error('The client was not found.');
      const result = await shipping.save();
      clientFound.shipList.push(shipping);
      await clientFound.save();
      return {
        ...result._doc,
        _id: result.id,
        client: clientHandler.bind(this, result._doc.client),
      };
    } catch (error) {
      throw error;
    }
  },
};
