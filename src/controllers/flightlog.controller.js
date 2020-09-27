const express = require('express');
const Flightlog = require('../models/flightlog.model');
const app = express();
const Pilot = require('../models/pilot.model');

module.exports = {

  async list(req, res) {
    try {

      const flightlog = await Flightlog.find()
      .populate({
        path: 'pilot',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const flightlog = await Flightlog.create({...data, pilot})

      pilot.flightlogs.push(flightlog)
      await pilot.save({validateBeforeSave: false})

      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const flightlog = await Flightlog.findById(id);

      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const flightlog = await Flightlog.find({pilot: id});

      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const flightlog = await Flightlog.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const flightlog = await Flightlog.findByIdAndDelete(id)

      res.status(200).json(flightlog);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}