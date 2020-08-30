const Querie = require('../models/querie.model');

module.exports = {

  async list(req, res) {
    try {
      const querie = await Querie.find()
      .populate({
        path: 'pilot',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const querie = await Querie.create({...data, pilot})

      pilot.queries.push(querie)
      await pilot.save()

      const thisquerie = await Querie.findById(querie._id)
      thisquerie.pilots.push(pilot)
      await thisquerie.save()

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const querie = await Querie.findById(id);

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const querie = await Querie.find({pilots: id});

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const querie = await Querie.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const querie = await Querie.findByIdAndDelete(id)

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}