const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const Users = require('../users/users-model');

router.post('/register', async (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
    const [registered] = await Users.add(user);
    user.id = registered;
    const token = generateToken(user);
    delete user.password;
    res.status(201).json({ registered_user: user, token: token });
  }
  catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  // implement login
  let { username, password } = req.body;

  try {
    const loggedIn = await Users.findBy({ username }).first();

    if (loggedIn && bcrypt.compareSync(password, loggedIn.password )) {
      const token = generateToken(loggedIn);
      res.status(200).json({ username: `${loggedIn.username}`, token: token });
    }
    else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  }
  catch (error) {
    next(error);
  }
});

function generateToken(user) {
  
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '2 min'
  }

  const token = jwt.sign(payload, secrets.JWT_SECRET, options);
  return token;
}

const errorHandler = ((error, req, res, next) => {
  res.status(500).json({ error: 'Server error: recheck data and retry' });
  next();
});

router.use(errorHandler);


module.exports = router;
