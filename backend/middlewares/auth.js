const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401-UnauthorizedError');

async function verifyToken(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Для продолжения требуется вход в систему');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = await jwt.verify(token, 'ryangosling');
    } catch (err) {
      throw new UnauthorizedError('Для продолжения требуется вход в систему');
    }

    request.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
