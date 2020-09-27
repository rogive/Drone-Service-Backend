const { Schema, model } = require('mongoose')

const equipmentSchema = new Schema({ 
  brand: {
    type: String,
    required: [ true, 'Se requiere una marca para esta accion' ]
  },
  model: {
    type: String,
    required: [ true, 'Se requiere un modelo para esta accion' ]
  },
  insurance: String,
  url: String,
  pilot: { 
    type: Schema.Types.ObjectId, 
    ref: 'Pilot', 
    require: true
  }
},
{
  timestamps: true,
});

const Equipment = model('Equipments',equipmentSchema)

module.exports = Equipment