const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (cards.length === 0) {
        res.status(404).send({ message: 'Cards not found' });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((error) => {
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const delCard = (req, res) => {
  const _id = req.params.cardId;
  Card.findByIdAndRemove(_id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card with such an id doesn't exist" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: `Wrong id - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const addLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const delLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $pull: {
      likes: _id,
    },
  },
  {
    runValidators: true,
    new: true,
  })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

module.exports = {
  createCard, getCards, addLike, delLike, delCard,
};
