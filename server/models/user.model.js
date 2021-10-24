const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please, add your email to continue'],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: [true, 'Please, choose your password'],
        minlength: 4
    },
    name: {
        type: String,
        required: [true, 'Please, choose a name']
    },
    surname: {
        type: String,
        required: [true, 'Please, choose a name']
    },
    profilePicture: {
        type: String
    },
    profileActive: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User