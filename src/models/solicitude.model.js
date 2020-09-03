const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
  servicetype: String,
  certifiedpilot: String,
  ownequipment: String,
  equipment: String,
  description: String,
  dateservice: {
    type: String,
    required: [ true, 'Por favor seleccione un departamento' ]
  },
  department: {
    type: String,
    required: [ true, 'Por favor seleccione un departamento' ]
  },
  city: {
    type: String,
    required: [ true, 'Por favor seleccione una ciudad' ]
  },
  images: Array,
  client: {
    type: Schema.Types.ObjectId, 
    ref: 'Client', 
    require: true
  }
},
{
  timestamps: true,
});

const Solicitude = model('Solicitudes',requestSchema)

module.exports = Solicitude