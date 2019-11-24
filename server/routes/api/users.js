const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const secret = config.get('secret');

const nodemailer = require('nodemailer')


// @route    POST /users
// @desc     Register User in database and get Token
// @access   Public

router.post('/register', [
    check('firstName', 'First name is required')
        .not().isEmpty(),
    check('lastName', 'Last name is required')
        .not().isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with at least 8 or more characters')
        .isLength({ min: 8 })
], async (req, res) => {
        
        // Check for errors in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors });
        }

        const {firstName, lastName, email, password} = req.body;
        try {
            // Check if user already exists
            let userDB = await User.findOne({ "email": email });
            if(userDB) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            // Create new user, encrypt password and save it in the database
            let newUser = await new User({
                firstName, lastName, email, password
            })
            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(password, salt)
            await newUser.save();

            let testAccount = await nodemailer.createTestAccount();
            console.log(testAccount)
            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass // generated ethereal password
            }
        });

        try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "BlackBones <othilebarmoud@gmail.com>", // sender address
            to: `${firstName}, ${email}`, // list of receivers
            subject: 'Registration to Blackbones', // Subject line
            html: "<h2>BlackBones</h2><p>You've just registered to BlackBones</p><p>See you in a bit</p>" // html body
        });


        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch(err) {
        console.log(err.message);
    }

            // Generate token and return it
            const payload= {
                user: {
                    id: newUser.id
                }
            }
            jwt.sign(payload, secret, {
                expiresIn: 3600
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({"token": token});
            })
        } catch(err) {
            res.status(500).send(err.message);
        } 
});

// @route    GET /getUser
// @desc     List all the users in database
// @access   Public

router.get('/getUser', async (req, res) => {
    let allUsers = await User.find({});
    if(allUsers) {
        return res.status(200).send(allUsers);
    } else {
        return res.status(400).send('No user in database')
    }
})

module.exports = router;
