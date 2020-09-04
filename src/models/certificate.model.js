const { Schema, model } = require('mongoose')

const certificateSchema = new Schema({ 
  name: {
    type: String,
    required: [ true, 'Se requiere un documento para esta accion' ]
  },
  url: String,
  type: String,
  pilot: { 
    type: Schema.Types.ObjectId, 
    ref: 'Pilot', 
    require: true
  }
},
{
  timestamps: true,
});

const Certificate = model('Certificates',certificateSchema)

module.exports = Certificate