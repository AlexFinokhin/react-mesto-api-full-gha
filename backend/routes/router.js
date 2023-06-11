const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const auth = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const { createUser, login, logout } = require('../controllers/users');

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/404-NotFoundError');
const authLimiterOptions = require('../configs/rateLimit');

const { requestLogger, errorLogger } = require('../configs/winston');

const authLimiter = rateLimit(authLimiterOptions);

router.use(requestLogger);

router.post('/signin', authLimiter, validationLogin, login);
router.post('/signup', authLimiter, validationCreateUser, createUser);
router.get('/signout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((request, response, next) => {
  next(new NotFoundError('Ошибка: Страница не найдена'));
});

router.use(errorLogger);

module.exports = router;
