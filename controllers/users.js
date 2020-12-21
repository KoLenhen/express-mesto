const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send({ message: 'Users not found' });
        return;
      }
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: `Wrong ID - ${error}` });
        return;
      }
      if (error.statusCode === 404) {
        res.status(404).send({ message: 'User not found' });
        return;
      }
      res.status(500).send({ message: `${error}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const userInfoUpdate = (req, res) => {
  User.findByIdAndUpdate('5fddaa97970de041ec182698', {
    name: 'newName',
    about: 'newDescription',
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const userAvatarUpdate = (req, res) => {
  User.findByIdAndUpdate('5fddaa97970de041ec182698', {
    avatar: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  })
    .then((user) => {
      res.status(200).send({ data: user });
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
  getUsers, getUserByID, createUser, userInfoUpdate, userAvatarUpdate,
};
