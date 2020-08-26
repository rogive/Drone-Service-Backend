const jwt = require('jsonwebtoken');

module.exports = {
  auth(req, res, next) {
    try {
      const { authorization } = req.headers;

      if(!authorization) {
        throw Error('Tu sesión ha expirado!')
      }

      const [ bearer, token ] = authorization.split(' ');

      if(!token) {
        throw Error('Tu sesión ha expirado!')
      }

      const { id } = jwt.verify(token, process.env.SECRET);

      req.user = id

      next();
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  }
}