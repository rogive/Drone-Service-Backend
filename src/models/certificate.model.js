const { Schema, model } = require('mongoose')

const certificateSchema = new Schema({ 
  name: {
    type: String,
    required: [ true, 'Se requiere un documento para esta accion' ]
  },
  url: String,
  type: String,
  title: {
    type: String,
    required: [ true, 'Se requiere un titulo para esta accion' ]
  },
  company: {
    type: String,
    required: [ true, 'Se requiere una empresa emisora para esta accion' ]
  },
  credential: {
    type: String,
    required: [ true, 'Se requiere un credencial para esta accion' ]
  },
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