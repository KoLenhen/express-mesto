const cardsRouter = require('express').Router();

const {
  createCard, getCards, addLike, delLike, delCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', delCard);
cardsRouter.put('/:cardId/likes', addLike);
cardsRouter.delete('/:cardId/likes', delLike);

module.exports = cardsRouter;
