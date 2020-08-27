const express = require('express');
const Media = require('../models/media.model');
const Pilot = require('../models/pilot.model')
const app = express();

module.exports = {

  async list(req, res) {
    try {
      const media = await Media.find();

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const media = await Media.create({...data, pilot })

      pilot.queries.push(media)
      await pilot.save()

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const media = await Media.findById(id);

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const media = await Media.find({pilotId: id});

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const media = await Media.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const media = await Media.findByIdAndDelete(id)

      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}