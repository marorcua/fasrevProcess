const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const User = require('../models/user.model')
const { isLoggedIn, checkRoles } = require('./../middlewares/index')
const crypto = require('crypto')
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')
const MailToken = require('../models/mailToken.model')
const path = require('path')


// SIGN UP (POST)
router.post('/signup', (req, res) => {

    const { email, password, profilePicture, name, surname } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                res.status(400).json({ code: 400, message: 'Email already exists' })
                return
            }

            if (password.length === 0) {
                res.status(400).json({ code: 400, message: 'Please, enter a password' })
                return
            }

            if (password.length < 5) {
                res.status(400).json({ code: 400, message: 'Password should be more than 5 characters' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass, profilePicture, name, surname })
                .then(() => res.json({ code: 200, message: 'User created. Check your email to activate user.' }))
                .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))
})

// LOG IN (POST)
router.post('/login', (req, res) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.status(401).json({ code: 401, message: 'Email not registered', err: "Wrong user" })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Incorect password', err: "Wrong password" })
                return
            }

            if (!user.profileActive) {
                res.status(401).json({ code: 401, message: 'User profile not active', err: "Active user" })
                return
            }

            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err })
        )
})

// LOG OUT (GET)
router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})

// IS LOGGEDIN (POST)
router.post('/isloggedin', isLoggedIn, (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

//DELETE USER

router.delete('/delete/:user_id', isLoggedIn, (req, res) => {

    User
        .findByIdAndDelete(req.params.user_id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ code: 400, message: 'Error eliminating client', err }))
})

router.post('/welcomemail', (req, res) => {
    console.log('aqui andamos', req.body)
    const { email } = req.body
    const myEmail = 'homedesignfurnituresapp@gmail.com'

    MailToken
        .findOne({ email })
        .then(token => {
            if (token) {
                token.deleteOne()
            }
            let resetToken = crypto.randomBytes(32).toString("hex");

            return resetToken
        })
        .then(hash => {

            MailToken
                .create({
                    email,
                    token: hash,
                    createdAt: Date.now(),
                })
                .then(newToken => {
                    const link = `${process.env.DOMAIN_LOCAL}/validate/${newToken.token}`;
                    return link;
                })
                .then(link => {

                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: `${process.env.NODEMAILER_MAIL}`,
                            pass: `${process.env.NODEMAILER_PASS}`
                        }
                    })

                    transporter.sendMail({
                        from: `"Server" <${myEmail}>`,
                        to: email,
                        subject: 'Welcome to the homepage',
                        text: `${link}`,
                        html: `<b>fasfdas <br> <a href=${link}>Link to validate profile</a>`
                    })
                        .then(info => {

                            console.log('hola');
                            return res.json(info)
                        })
                        .catch(error => console.log(error));

                })
                .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching token', err }))
})

router.post('/validate', (req, res) => {
    const { token } = req.body
    console.log(token);
    MailToken
        .findOne({ token })
        .then(mailToken => {
            console.log(mailToken)
            if (!mailToken) {
                res.status(400).json({ code: 400, message: 'Cant value email, please try again' })
                return
            }

            User
                .findOneAndUpdate({ email: mailToken.email }, { profileActive: true })
                .then(response => res.json(response))
                .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
        })
        .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
})

router.get('/:imageName', isLoggedIn, (req, res) => {
    const image = req.params.imageName
    console.log('hola');
    res.sendFile(path.join(__dirname, `../public/${image}`));
})

router.put('/update', isLoggedIn, (req, res) => {
    const { email, profilePicture, name, surname, _id } = req.body

    User
        .findByIdAndUpdate(_id, { email, profilePicture, name, surname }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))

})

module.exports = router