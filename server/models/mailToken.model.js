const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailTokenSchema = new Schema({
    email: {
        type: String
    },
    token: {
        type: String,
        required: [true, 'Please, choose your password'],
        minlength: 4
    }
})

const MailToken = mongoose.model("User", mailTokenSchema)

module.exports = MailToken