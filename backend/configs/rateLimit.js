const { NODE_ENV = 'development', MAX_AUTH_ATTEMPTS = 5 } = process.env;

const authLimiterOptions = {
  windowMs: 1 * 60 * 1000,
  max: NODE_ENV === 'production' ? MAX_AUTH_ATTEMPTS : 100,
  message: 'Превышено максимальное количество попыток регистрации или входа с вашего IP адреса. Пожалуйста, повторите попытку через час.',
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = authLimiterOptions;
