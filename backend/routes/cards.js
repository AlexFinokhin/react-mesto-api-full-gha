const cardRoutes = require('express')
  .Router();

const {
  getCards,
  deleteCard,
  createCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validation');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validationCreateCard, createCard);
cardRoutes.delete('/:cardId', validationCardId, deleteCard);
cardRoutes.put('/:cardId/likes', validationCardId, addCardLike);
cardRoutes.delete('/:cardId/likes', validationCardId, deleteCardLike);

module.exports = cardRoutes;
