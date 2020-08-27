const { Schema, model } = require('mongoose')

const certificateSchema = new Schema({ 
  pilotId: String,
  name: String,
  url: String,
  type: String
},
{
  timestamps: true,
});

const Certificate = model('Certificates',certificateSchema)

module.exports = Certificate