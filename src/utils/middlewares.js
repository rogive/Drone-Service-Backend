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
  },

  paymentCheck(req, res, next) {
    try {
      const { x_cod_response } = req.headers

      if(!x_cod_response) {
        throw Error('No se registra ningún pago, intente nuevamente por favor')
      }

      switch (x_cod_response) {
        case '1':
          break;

        default:
          throw Error('Pago no exitoso');
      }

      next()
    } catch (err) {
      res.status(402).json({ message: err.message })
    }
  }
}