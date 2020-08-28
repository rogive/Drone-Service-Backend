const express = require('express');
const Certificate = require('../models/certificate.model');
const app = express();

module.exports = {

  async list(req, res) {
    try {
      const certificate = await Certificate.find();

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const certificate = await Certificate.create(data);

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const certificate = await Certificate.findById(id);

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    try {
      const { id } = req.params;
      const certificate = await Certificate.find({pilotId: id});

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const certificate = await Certificate.findByIdAndUpdate(id, data, { new: true })

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const certificate = await Certificate.findByIdAndDelete(id)

      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }
}