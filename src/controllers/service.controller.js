const Service = require('../models/service.model');
const Pilot = require('../models/pilot.model');

module.exports = {

  async list(req, res) {
    try {
      const service = await Service.find()
      .populate({
        path: 'pilot',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(service);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const service = await Service.create({...data, pilot})

      pilot.services.push(service)
      await pilot.save()

      const thisservice = await Service.findById(service._id)
      thisservice.pilots.push(pilot)
      await thisservice.save()

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.find({pilot: id});

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const service = await Service.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.findByIdAndDelete(id)

      res.status(200).json(service);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}