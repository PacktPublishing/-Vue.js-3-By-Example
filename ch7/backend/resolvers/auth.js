const jwt = require('jsonwebtoken');

module.exports = {
  login: ({ user: { username, password } }) => {
    if (username === 'admin' && password === 'password') {
      return { token: jwt.sign({ username }, 'secret') }
    }
    throw new Error('authentication failed');
  }
}
