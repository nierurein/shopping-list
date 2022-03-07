const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token'); // token value
  // Check for token
  if(!token) {
    res.status(401).json({msg: 'No token, auth denied'}) // unauthorized
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({msg: 'Token not valid'})
  }
}

module.exports = auth;