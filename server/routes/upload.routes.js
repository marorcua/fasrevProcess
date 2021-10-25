const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const upload = require('../config/uploadFile.config')
const multer = require('multer')



router.post('/image', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})


module.exports = router