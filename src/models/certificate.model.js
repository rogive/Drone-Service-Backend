const { Schema, model } = require('mongoose')

const certificateSchema = new Schema({ 
  name: String,
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