const Pilot = require('../models/pilot.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  async list(req, res) {
    try {
      const pilots = await Pilot.find({});
      res.status(200).json(pilots);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async signup(req, res) {
    try {
      const data = req.body;
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

      res.status(200).json({token, pilot});
    } catch(err) {
      res.status(401).json({ message: err.message })
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params
      const pilot = await Pilot.findById( id )
      
      if(!pilot) {
        throw Error('El piloto no existe');
      }
      
      res.status(200).json({ pilot });
    } catch(err) {
      res.status(401).json({ message: `No se encontró el usuario con id ${id}` })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const pilot = await Pilot.findByIdAndUpdate(id, data, {
        new: true,
        useFindAndModify: false,
      });
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const pilot = await Pilot.findByIdAndDelete(id)
      res.status(200).json(pilot);
    } catch (err) {
      res.status(400).json({ message: `Could not find task with id ${id}` });
    }
  },

  async filter(req, res){
    const { info } = req.body
    let pilot 
    try{  
          if(info.categorie && info.departmentID && info.city){
            pilot = await Pilot.find({$and:[{"services.name" : info.categorie},{"department" : parseInt(info.departmentID)},{"city":info.city}]}).populate("media");
          }else if(info.departmentID && info.city){
            pilot = await Pilot.find({$and:[{"department" : parseInt(info.departmentID)},{"city":info.city}]}).populate("media");
          }else if(info.categorie && info.departmentID){
            pilot = await Pilot.find({$and:[{"services.name" : info.categorie},{"department" : parseInt(info.departmentID)}]}).populate("media");
          }else if(info.categorie){
            pilot = await Pilot.find({ "services.name" : info.categorie  }).populate("media");
          }else if(info.departmentID){
            pilot = await Pilot.find({ "department" : parseInt(info.departmentID) }).populate("media");
          }else if(info.city){
            pilot = await Pilot.find({"city":info.city}).populate("media")
          }
      res.status(200).json(pilot)
    }catch (err){
      console.log(err)
    }
  }
}