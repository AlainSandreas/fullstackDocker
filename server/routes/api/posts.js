const express = require('express');
const router = express.Router();

/* @route    POST /posts
** @desc     Register User, check format of email, name and password
** @access   Public
*/
router.get('/', (req, res) => res.send('Post works'));

module.exports = router;