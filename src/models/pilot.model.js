const { Schema, model } = require('mongoose')

const pilotSchema = new Schema({ 
  name: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  department: String,
  city: String,
  userType: String,
},
{
  timestamps: true,
});

const Pilot = model('Pilot',pilotSchema)

module.exports = Pilot