const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('secret')

// @role   Middleware
// @desc   protect routes

module.exports = function(req, res, next) {

    // Get token from header
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, secret)
        req.user = decoded.user;
        // Use next() in middleware to pass to the next parameter
        next();
    } catch(err) {
        res.status(401).json({ msg: 'token is not valid ' })
    }
}
