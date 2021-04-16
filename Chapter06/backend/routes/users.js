const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'password') {
    res.json({ token: jwt.sign({ username }, 'secret') })
  }
  res.status(401)
});

module.exports = router;
