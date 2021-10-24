const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onlyLettersAllow = function (string) {
    var myRegxp = /^[a-zA-Z]+$/i;
    return myRegxp.test(string);
}

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
        minlength: 5
    },
    name: {
        type: String,
        required: [true, 'Please, choose a name'],
        validate: {
            validator: string => onlyLettersAllow(string),
            message: 'Only letters in name'
        }
    },
    surname: {
        type: String,
        required: [true, 'Please, choose a surname'],
        validate: {
            validator: string => onlyLettersAllow(string),
            message: 'Only letters in surname'
        }
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