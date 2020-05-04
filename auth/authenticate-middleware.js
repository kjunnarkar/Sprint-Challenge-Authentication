/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


module.exports = (req, res, next) => {
  
  const token = req.headers.authorization;
   
  if (token) {
    jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' });
      }
      else {
        req.decodedToken = decodedToken;
        next();
      }
    })    
  }
  else {
    req.status(401).json({ error: 'Must be logged in and authorized' });
  }
};
