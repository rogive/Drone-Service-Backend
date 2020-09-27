const express = require('express');
const Equipment = require('../models/equipment.model');
const app = express();
const Pilot = require('../models/pilot.model');

module.exports = {

  async list(req, res) {
    try {

      const equipment = await Equipment.find()
      .populate({
        path: 'pilot',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const equipment = await Equipment.create({...data, pilot})

      pilot.equipments.push(equipment)
      await pilot.save({validateBeforeSave: false})

      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.findById(id);

      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.find({pilot: id});

      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const equipment = await Equipment.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.findByIdAndDelete(id)

      res.status(200).json(equipment);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}