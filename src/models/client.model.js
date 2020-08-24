const { Schema, model } = require('mongoose')

const clientSchema = new Schema({ 
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

const Client = model('Client',clientSchema)

module.exports = Client