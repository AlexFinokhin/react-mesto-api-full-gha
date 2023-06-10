const cardSchema = require('../models/card');
const NotFoundError = require('../errors/404-NotFoundError');
const BadRequestError = require('../errors/400-BadRequestError');
const ForbiddenError = require('../errors/403-ForbiddenError');

async function getCards(request, response, next) {
  try {
    const cards = await cardSchema.find({});
    response.status(200).send(cards);
  } catch (error) {
    next(error);
  }
}

async function createCard(request, response, next) {
  try {
    const { name, link } = request.body;
    const owner = request.user._id;

    const card = await cardSchema.create({ name, link, owner });
    response.status(201).send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Ошибка: неверные данные для создания карточки'));
    } else {
      next(error);
    }
  }
}

async function deleteCard(request, response, next) {
  try {
    const { cardId } = request.params;
    const card = await cardSchema.findById(cardId);

    if (!card) {
      throw new NotFoundError('Ошибка: указан недействительный идентификатор карточки');
    }

    if (!card.owner.equals(request.user._id)) {
      next(new ForbiddenError('Ошибка: карточка не может быть удалена'));
    }

    await card.deleteOne();
    response.send({ message: 'Ошибка: карточка была удалена' });
  } catch (error) {
    next(error);
  }
}

async function addCardLike(request, response, next) {
  try {
    const card = await cardSchema.findByIdAndUpdate(
      request.params.cardId,
      { $addToSet: { likes: request.user._id } },
      { new: true },
    );

    if (!card) {
      next(new NotFoundError('Ошибка: указан недействительный идентификатор карточки'));
    } else {
      response.send({ data: card });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Ошибка: неверные данные для добавления лайка'));
    } else {
      next(error);
    }
  }
}

async function deleteCardLike(request, response, next) {
  try {
    const card = await cardSchema.findByIdAndUpdate(
      request.params.cardId,
      { $pull: { likes: request.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('Ошибка: указан недействительный идентификатор карточки');
    } else {
      response.send({ data: card });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Ошибка: некорректные данные для снятия лайка'));
    } else {
      next(error);
    }
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
