const express = require('express');
const Media = require('../models/media.model');
const app = express();

module.exports = {

  async list(req, res) {
    const media = await Media.find();

    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    const data = req.body;

    const media = await Media.create(data);
    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async show(req, res) {
    const { id } = req.params;
    const media = await Media.findById(id);

    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async showpilot(req, res) {
    const { id } = req.params;
    const media = await Media.find({pilotId: id});

    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const media = await Media.findByIdAndUpdate(id, data, { new: true })

    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    const { id } = req.params;

    const media = await Media.findByIdAndDelete(id)

    try {
      res.status(200).json(media);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  }


}