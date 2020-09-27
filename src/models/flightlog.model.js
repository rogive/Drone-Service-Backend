const { Schema, model } = require('mongoose')

const flightlogSchema = new Schema({ 
  name: {
    type: String,
    required: [ true, 'Se requiere un documento para esta accion' ]
  },
  company: {
    type: String,
    required: [ true, 'Se requiere una empresa para esta accion' ]
  },
  specialty: String,
  rol: String,
  url: String,
  brand: String,
  model: String,
  flighttime: {
    type: String,
    required: [ true, 'Se requiere una cantidad de horas de vuelo para esta acción para esta accion' ]
  },
  takeoffs: {
    type: String,
    required: [ true, 'Se requiere una cantidad de despegues y aterrizajes para esta accion' ]
  },
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

const FlightLog = model('FlightLogs',flightlogSchema)
module.exports = FlightLog