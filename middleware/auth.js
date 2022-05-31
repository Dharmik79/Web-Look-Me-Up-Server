const passport = require('passport');

function authentication(req, res, next) {
    return passport.authenticate(
      'jwt', {
        session: false,
      },
      (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.status(401).send({
            STATUS:"FAILURE",
            MESSAGE: 'Unauthenticated',
            CODE:401
          })
        }
        req.user = user
        next()
      }
    )(req, res, next)
  }



  module.exports = {
    authentication: authentication
  };