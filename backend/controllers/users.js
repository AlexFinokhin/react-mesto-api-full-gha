const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = require('../models/user');
const ConflictError = require('../errors/409-ConflictError');
const NotFoundError = require('../errors/404-NotFoundError');
const BadRequestError = require('../errors/400-BadRequestError');

async function getUsers(request, response, next) {
  try {
    const users = await userSchema.find({});
    response.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(request, response, next) {
  try {
    const { userId } = request.params;
    const user = await userSchema.findById(userId);
    if (!user) {
      throw new NotFoundError('Ошибка: пользователь с указанным идентификатором не найден');
    }
    response.send({ data: user });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Ошибка: некорректный запрос'));
    } else {
      next(error);
    }
  }
}

async function getUser(request, response, next) {
  try {
    const user = await userSchema.findById(request.user._id);
    if (!user) {
      throw new NotFoundError('Ошибка: пользователь с указанным идентификатором не найден');
    }
    response.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Ошибка: некорректный запрос'));
    } else if (error.message === 'NotFound') {
      next(new NotFoundError('Ошибка: пользователь с указанным идентификатором не найден'));
    } else {
      next(error);
    }
  }
}

async function updateUser(request, response, next) {
  try {
    const { name, about } = request.body;
    const user = await userSchema.findByIdAndUpdate(
      request.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Ошибка: пользователь с указанным идентификатором не найден');
    }
    response.status(200).send(user);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      next(new BadRequestError('Ошибка: неверные данные для обновления пользователя'));
    } else {
      next(error);
    }
  }
}

async function updateAvatar(request, response, next) {
  try {
    const { avatar } = request.body;
    const user = await userSchema.findByIdAndUpdate(
      request.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    response.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      next(new BadRequestError('Ошибка: неверные данные для обновления аватара'));
    } else {
      next(error);
    }
  }
}

async function createUser(request, response, next) {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = request.body;

    const hash = await bcrypt.hash(password, 10);
    await userSchema.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    response.status(201).json({
      data: {
        name,
        about,
        avatar,
        email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError('Ошибка: пользователь с таким email уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new BadRequestError('Ошибка: неверные данные'));
    } else {
      next(error);
    }
  }
}

async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const user = await userSchema.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'ryangosling', { expiresIn: '7d' });

    response.json({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUser,
  updateUser,
  updateAvatar,
  login,
  createUser,
};
