
const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
  mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}