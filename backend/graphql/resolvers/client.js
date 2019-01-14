const Client = require('../../models/Client');
const { transformClientData, transformData } = require('./merge');

/* eslint-disable */
module.exports = {
  clients: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    try {
      const clients = await Client.find();
      return clients.map((client) => {
        return transformClientData(client);
      });
    } catch (error) {
      throw error;
    }
  },
  createClient: async (ars, req) => {
    if (!req.isAuth) throw new Error('You have not logged in.');
    const {
      email,
      firstName,
      lastName,
      password,
    } = ars.clientInput;
    try {
      const isThereAClient = await Client.findOne({
        email,
      });
      if (isThereAClient) throw new Error('There is already a registered client with the same email.');
      const client = new Client({
        email,
        firstName,
        lastName,
        password,
      });
      const result = await client.save();
      return transformData(result);
    } catch (error) {
      throw error;
    }
  },
};
