const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/404-NotFoundError');
const authLimiterOptions = require('../configs/rateLimit');

const { requestLogger, errorLogger } = require('../configs/winston');

const authLimiter = rateLimit(authLimiterOptions);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(requestLogger);

router.post('/signin', authLimiter, validationLogin, login);
router.post('/signup', authLimiter, validationCreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use(errorLogger);

router.use((request, response, next) => {
  next(new NotFoundError('Ошибка: Страница не найдена'));
});

module.exports = router;
