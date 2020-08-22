const { Schema, model } = require('mongoose')

const pilotSchema = new Schema({ 
  name: String,
  published: { type: Boolean, default: false },
},
{
  timestamps: true,
});

const Pilot = model('Pilot',pilotSchema)

module.exports = Pilot