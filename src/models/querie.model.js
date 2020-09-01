const { Schema, model } = require('mongoose')

const querieSchema = new Schema({
  title: String,
  description: String,
  client: { 
    type: Schema.Types.ObjectId, 
    ref: 'Client', 
    require: true
  },
})

const Querie = model('Querie',querieSchema)

module.exports = Querie