const express = require('express');
const Other = require('../models/other.model');
const app = express();
const Pilot = require('../models/pilot.model');

module.exports = {

  async list(req, res) {
    try {

      const other = await Other.find()
      .populate({
        path: 'pilot',
        select: '_id name',
      })
      res.status(200).json(other);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const other = await Other.create({...data, pilot})
      pilot.others.push(other)
      await pilot.save({validateBeforeSave: false})

      res.status(200).json(other);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const other = await Other.findById(id);

      res.status(200).json(other);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const other = await Other.find({pilot: id});

      res.status(200).json(other);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const other = await Other.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(other);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const other = await Other.findByIdAndDelete(id)

      res.status(200).json(other);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}