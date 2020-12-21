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
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User with this ID is not found' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: `Wrong ID - ${error}` });
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
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(400).send({ message: `Validation error - ${error}` });
        return;
      }
      res.status(500).send({ message: `Server error - ${error}` });
    });
};

const userInfoUpdate = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: 'newestName',
    about: 'newestDescription',
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User with this ID is not found' });
        return;
      }
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
  User.findByIdAndUpdate(req.user._id, {
    avatar: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpg',
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User with this ID is not found' });
        return;
      }
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
