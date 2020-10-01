const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
  servicetitle: {
    type: String,
    required: [ true, 'El campo tipo de servicio es requerido' ]
  },
  servicetype: {
    type: String,
    required: [ true, 'El campo tipo de servicio es requerido' ]
  },
  certifiedpilot: {
    type: String,
    required: [ true, 'El campo certificado es requerido' ]
  },
  ownequipment: {
    type: String,
    required: [ true, 'El campo equipo propio es requerido' ]
  },
  equipment: {
    type: String
  },
  description: {
    type: String,
    required: [ true, 'El campo descripción es requerido' ]
  },
  dateservice: {
    type: String,
    required: [ true, 'El campo fecha del servicio es requerido' ]
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
  },
  phone: String,
  clientName: String,
  clientEmail: String,
},
{
  timestamps: true,
});

const Solicitude = model('Solicitudes',requestSchema)

module.exports = Solicitude