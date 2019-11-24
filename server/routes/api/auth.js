const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../../models/User');
const secret = config.get('secret');

/* @route    GET /auth/user
** @desc     Test the auth-protected routes
** @access   Private
*/

router.get('/user', auth, async (req, res) => {
    try {
        // Find the authorized User in database
        const user = await User.findById({ _id:req.user.id });
        return res.status(200).json({ user:user })

    } catch(err) {
        res.status(400).json({ "msg":'Server error' })
    }
});

// @route    POST /login
// @desc     Authenticate User for login
// @access   Public

router.post('/login', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
        
        // Check for errors in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors });
        }

        const {email, password} = req.body;
        try {
            // Check if user exists in dtabase
            let userDB = await User.findOne({ "email": email });
            if(!userDB) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
            }

            let auth = await bcrypt.compare(password, userDB.password)
            if (!auth) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
            }
            
            // Generate token and return it
            const payload= {
                user: {
                    id: userDB.id
                }
            }
            jwt.sign(payload, secret, {
                expiresIn: 1800
                }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({"token": token});
            })
        } catch(err) {
            res.status(500).send(err.message);
        } 
});

module.exports = router;