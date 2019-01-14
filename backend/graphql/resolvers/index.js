const authResolver = require('./auth');
const clientResolver = require('./client');
const distributorResolver = require('./distributor');
const shippingResolver = require('./shipping');
const assignmentResolver = require('./assignment');

const rootResolver = {
  ...authResolver,
  ...clientResolver,
  ...distributorResolver,
  ...shippingResolver,
  ...assignmentResolver,
};

module.exports = rootResolver;
