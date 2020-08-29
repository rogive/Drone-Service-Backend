const { Schema, model } = require('mongoose')

const serviceSchema = new Schema({ 
  name: String,
  pilots: [{
    type: Schema.Types.ObjectId,
    ref: 'Pilot',
  }]
},
{
  timestamps: true,
});

const Service = model('Services',serviceSchema)

module.exports = Service