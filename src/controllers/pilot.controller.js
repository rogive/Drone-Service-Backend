const express = require('express');
const Pilot = require('../models/pilot.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  async signup(req, res) {
    const data = req.body;

    try {
      const encryptedPassword = await bcrypt.hash(data.password, 8);
      const pilot = await Pilot.create({ ...data, password: encryptedPassword });

      res.status(200).json();
    } catch(err) {
      res.status(400).json(err);
    }

  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const pilot = await Pilot.findOne({ email });

      if(!pilot) {
        throw Error('El usuario no existe');
      }

      const isValid = await bcrypt.compare(password, pilot.password);

      if(!isValid) {
        throw Error('Usuario o contraseña invalido!');
      }

      const token = jwt.sign(
        { id: pilot._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 365 }
      );

      res.status(200).json({token});
    } catch(err) {
      res.status(401).json({ message: err.message })
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