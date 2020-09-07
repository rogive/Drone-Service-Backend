const express = require('express');
const Querie = require('../models/querie.model');
const Client = require('../models/client.model')

module.exports = {

 // Listar queries

  async list(req, res) {
    try {
      const querie = await Querie.find()
        .populate({
          path: 'client',
          select: '_id name', // separados por un espacio
          })
    
      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json(err);
    }
  },

 // Crear Querie

  async create(req, res) {
    try {
      const data = req.body;
      const { clientId }  = req.body;

      const client = await Client.findById(clientId)
      const querie = await Querie.create({...data, client })
      console.log(querie)

      client.queries.push(querie)
      await client.save({validateBeforeSave: false})

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json(err);
    }
  },

// Encontrar Querie por ID

  async show(req, res) {
    try {
      const { id } = req.params;
      const querie = await Querie.findById(id);

      res.status(200).json(querie);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

// Actualizar Querie por ID

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

// Borrar Querie

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