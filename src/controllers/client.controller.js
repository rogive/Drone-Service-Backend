const Client = require('../models/client.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  async list(req, res) {
    try {
      const clients = await Client.find({});
      res.status(200).json(clients);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async signup(req, res) {
    try {
      const data = req.body;
      const encryptedPassword = await bcrypt.hash(data.password, 8);
      const client = await Client.create({ ...data, password: encryptedPassword });
      res.status(200).json();
    } catch(err) {
      res.status(400).json(err);
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const client = await Client.findOne({ email });

      if(!client) {
        throw Error('El usuario no existe');
      }

      const isValid = await bcrypt.compare(password, client.password);

      if(!isValid) {
        throw Error('Usuario o contraseña invalido!');
      }

      const token = jwt.sign(
        { id: client._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 365 }
      );

      res.status(200).json({token, client});
    } catch(err) {
      res.status(401).json({ message: err.message })
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params
      const client = await Client.findById( id )
      
      if(!client) {
        throw Error('El Cliento no existe');
      }

      res.status(200).json({ client });
    } catch(err) {
      res.status(401).json({ message: `No se encontró el usuario con id ${id}` })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const client = await Client.findByIdAndUpdate(id, data, { new: true })
      res.status(200).json(client);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findByIdAndDelete(id)
      res.status(200).json(client);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async filter(req, res){
    const { info } = req.body
    let client 
    try{  
          if(info.categorie && info.departmentID && info.city){
            client = await Client.find({$and:[{"categorie" : info.categorie},{"departmentID" : parseInt(info.departmentID)},{"city":info.city}]});
          }else if(info.departmentID && info.city){
            client = await Client.find({$and:[{"departmentID" : parseInt(info.departmentID)},{"city":info.city}]});
          }else if(info.categorie){
            client = await Client.find({ "categorie" : info.categorie  });
          }else if(info.departmentID){
            client = await Client.find({ "departmentID" : parseInt(info.departmentID) });
          }else if(info.city){
            client = await Client.find({"city":info.city})
          }
      res.status(200).json(client)
    }catch (err){
      console.log(err)
    }
  }
}