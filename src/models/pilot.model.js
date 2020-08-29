const { Schema, model } = require('mongoose')

const pilotSchema = new Schema({ 
  name: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  department: String,
  city: String,
  certificates: [{
    type: Schema.Types.ObjectId,
    ref: 'Certificate',
  }],
  media: [{
    type: Schema.Types.ObjectId,
    ref: 'Media',
  }],
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service',
  }]
},
{
  timestamps: true,
});

const Pilot = model('Pilot',pilotSchema)

module.exports = Pilot