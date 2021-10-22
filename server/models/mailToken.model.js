const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailTokenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: [true, 'Please, choose your password'],
        minlength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800,
    },
})

const MailToken = mongoose.model("MailToken", mailTokenSchema)

module.exports = MailToken