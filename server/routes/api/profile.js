const express = require('express');
const router = express.Router();

/* @route    POST /profile
** @desc     Register User, check format of email, name and password
** @access   Public
*/
router.get('/', (req, res) => res.send('Profile works'));

module.exports = router;