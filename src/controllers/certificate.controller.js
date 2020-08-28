const express = require('express');
const Certificate = require('../models/certificate.model');
const Pilot = require('../models/pilot.model');

module.exports = {

  async list(req, res) {
    try {
      const certificate = await Certificate.find()
      .populate({
        path: 'pilot',
        select: '_id name', // separados por un espacio
      })
      res.status(200).json(certificate);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const { pilotId }  = req.body;

      const pilot = await Pilot.findById(pilotId)
      const certificate = await Certificate.create({...data, pilot })

      pilot.certificate.push(certificate)
      await pilot.save()

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
      const certificate = await Certificate.find({pilot: id});

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