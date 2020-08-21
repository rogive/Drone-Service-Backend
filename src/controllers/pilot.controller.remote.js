const { MongoClient } = require("mongodb");                                                                                                                    
const { url } = require("../key");  
const client = new MongoClient(url); 
//const Pilot = require("../models/pilot.model")

module.exports = {

// Metodo para listar todos los pilotos
  async list(req, res) {
    try{
      await client.connect();
      const Pilot = client.db("droneservice").collection("pilots");
      Pilot
          .findOne()
          .then((pilot) => res.status(200).json(pilot))
          .catch((err) => res.status(400).json(err));
    }
    catch(err) {
    }
    finally {
      await client.close();
    }
  }
// Metodo para crear un piloto
 /*  create(req, res) {
    const data = req.body;

    Pilot
      .create(data)
      .then((pilot) => res.status(200).json(pilot))
      .catch((err) => res.status(400).json(err));
   },
// Metodo para buscar un piloto por ID
  show(req, res) {
    const { id } = req.params;

    Pilot
      .findById(id)
      .then(pilot => res.status(200).json(pilot))
      .catch(() => res.status(400).json({ message: `Could not find task with id ${id}` }));
    },
// Metodo para actualizar un piloto por ID  
  update(req, res) {
    const { id } = req.params;
    const data = req.body;

    Pilot
      .findByIdAndUpdate(id, data, { new: true })
      .then(pilot => res.status(200).json(pilot))
      .catch(err => res.status(400).json(err));
  },

// Metodo para eliminar un piloto por ID
  destroy(req, res) {
    const { id } = req.params;

    Pilot
      .findByIdAndDelete(id)
      .then(pilot => res.status(200).json(pilot))
      .catch(() => res.status(400).json({ message: `Could not find task with id ${id}` }));
  } */
}
