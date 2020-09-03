const { Schema, model } = require('mongoose')

const requestSchema = new Schema({ 
  certified: String,
  description: String,
  media: Array,
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client',
  }]
},
{
  timestamps: true,
});

const Request = model('Requests',requestSchema)

module.exports = Request