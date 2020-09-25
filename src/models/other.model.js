const { Schema, model } = require('mongoose')

const otherSchema = new Schema({ 
  name: {
    type: String,
    required: [ true, 'Se requiere un documento para esta accion']
  },
  url: String,
  type: String,
  title: {
    type: String,
    required: [ true, 'Se requiere un titulo para esta accion']
  },
  company: {
    type: String,
    required: [ true, 'Se requiere una entidad para esta accion']
  },
  description: {
    type: String
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

const Other = model('Others',otherSchema)

module.exports = Other