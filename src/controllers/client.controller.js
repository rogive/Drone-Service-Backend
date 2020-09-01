const Client = require('../models/client.model')

module.exports = {
  
  async list(req, res) {
    try {
      const clients = await Client.find({});
      res.status(200).json(clients);

    } catch (err) {
      res.status(400).json(err);
    }
  },


  async create(req, res) {
    try {
      const data = req.body;
      const client = await Client.create(data);

      res.status(200).json(client);
    } catch (err) {
      res.status(400).json(err);
    }
  },

}