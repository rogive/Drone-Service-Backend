const { Schema, model } = require('mongoose')

const mediaSchema = new Schema({ 
  pilotId: String,
  url: String,
  type: String
},
{
  timestamps: true,
});

const Media = model('Media',mediaSchema)

module.exports = Media