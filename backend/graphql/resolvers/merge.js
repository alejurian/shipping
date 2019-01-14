const Shipping = require('../../models/Shipping');
const Client = require('../../models/Client');
const Distributor = require('../../models/Distributor');

/* eslint-disable */
const shippingsHandler = async (shippingIds) => {
  try {
    const shipList = await Shipping.find({
      _id: {
        $in: shippingIds,
      },
    });
    return shipList.map((shipping) => {
      return {
        ...shipping._doc,
        _id: shipping.id,
        client: clientHandler.bind(this, shipping.client),
      };
    });
  } catch (error) {
    throw error;
  }
};

const singleShippingHandler = async (shippingId) => {
  try {
    const shipment = await Shipping.findById(shippingId);
    return {
      ...shipment._doc,
      _id: shipment.id,
      client: clientHandler.bind(this, shipment.client),
    };
  } catch (error) {
    throw error;
  }
};

const clientHandler = async (clientId) => {
  try {
    const clientFound = await Client.findById(clientId);
    return {
      ...clientFound._doc,
      _id: clientFound._doc,
      shipList: shippingsHandler.bind(this, clientFound._doc.shipList),
    };
  } catch (error) {
    throw error;
  }
};

const distributorHandler = async (distributorId) => {
  try {
    const distributorFound = await Distributor.findById(distributorId);
    return {
      ...distributorFound._doc,
      _id: distributorFound._doc,
      shipList: shippingsHandler.bind(this, distributorFound._doc.shipList),
    };
  } catch (error) {
    throw error;
  }
};

const transformData = (user) => {
  return {
    ...user._doc,
    _id: user.id,
    password: null,
  };
};

const transformClientData = (client) => {
  return {
    ...client._doc,
    _id: client.id,
    password: null,
    shipList: shippingsHandler.bind(this, client.shipList),
  };
};

const transformAssignmentData = (assignment) => {
  return {
    ...assignment._doc,
    _id: assignment.id,
    shipping: singleShippingHandler.bind(this, assignment.shipping),
    distributor: distributorHandler.bind(this, assignment.distributor),
  };
};

exports.transformData = transformData;
exports.transformClientData = transformClientData;
exports.transformAssignmentData = transformAssignmentData;
exports.clientHandler = clientHandler;
exports.distributorHandler = distributorHandler;
exports.shippingsHandler = shippingsHandler;
