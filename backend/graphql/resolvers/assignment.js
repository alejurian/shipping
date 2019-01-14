const Assignment = require('../../models/Assignment');
const Shipping = require('../../models/Shipping');
const Distributor = require('../../models/Distributor');
const { transformAssignmentData } = require('./merge');

/* eslint-disable */
module.exports = {
  assignments: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    try {
      const assignments = await Assignment.find();
      return assignments.map((assignment) => {
        return transformAssignmentData(assignment);
      });
    } catch (error) {
      throw error;
    }
  },
  assignShipping: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    const {
      shipping,
      distributor,
    } = ars.assignShippingInput;
    try {
      const assignment = new Assignment({
        shipping,
        distributor,
      });
      const shippingFound = await Shipping.findById(shipping);
      if (!shippingFound) throw new Error('The shipping was not found.');
      if (shippingFound.distributor) throw new Error('The shipment has already been assigned.');
      const distributorFound = await Distributor.findById(distributor);
      if (!distributorFound) throw new Error('The distributor was not found.');
      const result = await assignment.save();
      shippingFound.distributor = distributor;
      await shippingFound.save();
      distributorFound.shipList.push(shipping);
      await distributorFound.save();
      return transformAssignmentData(result);
    } catch (error) {
      throw error;
    }
  },
};
