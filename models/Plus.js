const { model, Schema } = require('mongoose')

const PlusSchema = new Schema({
    count: Number
})

module.exports = model('Plus', PlusSchema)