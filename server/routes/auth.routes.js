const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const User = require('../models/user.model')
const { isLoggedIn, checkRoles } = require('./../middlewares/index')
const mongoose = require('mongoose')
const { checkMongooseError } = require('./../utils')
const MailToken = require('../models/mailToken.model')

// SIGN UP (POST)
router.post('/signup', (req, res) => {

    const { email, password } = req.body

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
                .create({ email, password: hashPass })
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

router.delete('/delete/:user_id', (req, res) => {

    User
        .findByIdAndDelete(req.params.user_id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ code: 400, message: 'Error eliminating client', err }))
})

router.post('/welcomemail', (req, res) => {
    console.log('aqui andamos', req.body)
    const { email } = req.body
    const myEmail = 'homedesignfurnituresapp@gmail.com'

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'homedesignfurnituresapp@gmail.com',
            pass: 'Popino2021'
        }
    })


    MailToken
        .findOne({ email })
        .then(token => {
            if (token) {
                token.deleteOne()
            }
            let resetToken = crypto.randomBytes(32).toString("hex");
            const hash = bcrypt.hash(resetToken, Number(bcryptSalt));

            return hash
        })
        .then(hash => {

            PasswordRecovery
                .create({
                    user: user._id,
                    token: hash,
                    createdAt: Date.now(),
                })
                .then(newToken => {
                    const link = `http://www.eatney.com/passwordreset?token=${newToken.token}`;
                    return link;
                })
                .then(link => {
                    const msg = {
                        to: `${email}`, // Change to your recipient
                        from: 'notifications@eatney.com', // Change to your verified sender
                        template_id: 'd-85e94073b42f4965950f99c11df9147f',
                        dynamicTemplateData: {
                            url: `${link}`
                        },
                    }

                    sgMail
                        .send(msg)
                        .then(response => {
                            return res.json(response)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch(err => res.status(400).json({ code: 400, message: checkMongooseError(err) }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }))

    transporter.sendMail({
        from: `"Client message" <${email}>`,
        to: myEmail,
        subject: subject,
        text: text,
        html: `<b>${text} <br>${email}</b>`
    })
        .then(info => res.json(info))
        .catch(error => console.log(error));
})

module.exports = router