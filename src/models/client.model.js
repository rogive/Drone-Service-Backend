const { Schema, model } = require('mongoose')

const clientSchema = new Schema({ 
  name: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  department: String,
  city: String,
  queries: [{
    type: Schema.Types.ObjectId,
    ref: 'Queries',
  }],
},
{
  timestamps: true,
});


const Client = model('Client',clientSchema)


module.exports = Client