const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.header('auth-token');

    if (! token) {
        return res.status(401).send('Access Denied! No token present...');
    }

    try {
        const tokenBody = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = tokenBody;
    } catch (error) {
        return res.status(401).send('Access Denied! Invalid token...');
    }

    next();
}