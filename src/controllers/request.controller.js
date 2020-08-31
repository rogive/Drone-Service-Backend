const Request = require('../models/request.model');
const Client = require('../models/client.model');
module.exports = {

/*   async list(req, res) {
    try {
      const request = await Request.find()
      .populate({
        path: 'client',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(request);
    } catch (err) {
      res.status(400).json(err);
    }
  },
 */
  async create(req, res) {
    try {
      const data = req.body;
      const { clientId }  = req.body;

      const client = await Client.findById(clientId)
      const request = await Request.create({...data, client})

      client.requests.push(request)
      await client.save()

      const thisrequest = await Request.findById(request._id)
      thisrequest.clients.push(client)
      await thisrequest.save()

      res.status(200).json(request);
    } catch (err) {
      res.status(400).json(err);
    }
  }
/* 
  async show(req, res) {
    try {
      const { id } = req.params;
      const request = await Request.findById(id);

      res.status(200).json(request);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showclient(req, res) {
    try {
      const { id } = req.params;
      const request = await Request.find({clients: id});

      res.status(200).json(request);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const request = await Request.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(request);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const request = await Request.findByIdAndDelete(id)

      res.status(200).json(request);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  } */
}