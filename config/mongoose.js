const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => console.log('failed to connection!'))
db.once('open', () => console.log('mongoDB connection!'))

module.exports = db