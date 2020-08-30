const { Schema, model } = require('mongoose')

const querieSchema = new Schema({ 
  certified: String,
  description: String,
  media: Array
},
{
  timestamps: true,
});

const Querie = model('Queries',querieSchema)

module.exports = Querie