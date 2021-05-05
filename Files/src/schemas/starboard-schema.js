const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const starboardSchema = new mongoose.Schema({
  // Guild ID
  _id: reqString,
  channelId: reqString,
})

module.exports = mongoose.model('starboard', starboardSchema)