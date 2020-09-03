const { Schema, model, models } = require('mongoose')

const emailRegexp = /((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*$/

const uniqueEmail = {
  async validator(email) {
    try {
      const pilot = await models.Pilot.findOne({ email });
      const client = await models.Client.findOne({ email });
      return (!pilot && !client);
    }
    catch (err) {
      return false;
    }
  },
  message: 'El email ya existe1'
}

const clientSchema = new Schema({ 
  name: {
    type: String,
    required: [ true, 'El campo nombres es requerido' ]
  },
  lastName: {
    type: String,
    required: [ true, 'El campo apellidos es requerido' ]
  },
  email: {
    type: String,
    required: [ true, 'El campo E-Mail es requerido' ],
    match: [ emailRegexp, 'E-mail inválido'],
    validate: [ uniqueEmail ],
  },
  password: {
    type: String,
    required: [ true, 'El campo contraseña es requerido' ]
  },
  phone: {
    type: String,
    match: [ phoneRegexp, 'Número de celular inválido'],
    minlength: [10, 'El número de celular debe tener mínimo 10 caracteres']
  },
  department: {
    type: String,
    required: [ true, 'Por favor seleccione un departamento' ]
  },
  city: {
    type: String,
    required: [ true, 'Por favor seleccione una ciudad' ]
  },
  userType: { 
    type: String,
    required: [ true, 'El tipo de usuario no está definido, intente registrarse nuevamente']
  },
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request',
  }]
},{ 
  timestamps: true 
})

const Client = model('Client',clientSchema)

module.exports = Client