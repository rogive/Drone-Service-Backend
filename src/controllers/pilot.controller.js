const express = require('express');
const Pilot = require('../models/pilot.model');
const app = express();

module.exports = {

  async list(req, res) {
    const pilots = await Pilot.find({});

    try {
      res.status(200).json(pilots);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Metodo para crear un piloto
  async create(req, res) {
    const data = req.body;

    const pilot = await Pilot.create(data);
    try {
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    const { id } = req.params;
    const pilot = await Pilot.findById(id);

    try {
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const pilot = await Pilot.findByIdAndUpdate(id, data, { new: true })

    try {
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    const { id } = req.params;

    const pilot = await Pilot.findByIdAndDelete(id)

    try {
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }

}