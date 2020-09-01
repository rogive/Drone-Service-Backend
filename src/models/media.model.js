const { Schema, model } = require('mongoose')

const mediaSchema = new Schema({ 
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

const Media = model('Media',mediaSchema)

module.exports = Media