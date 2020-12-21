const usersRouter = require('express').Router();
const {
  getUsers, createUser, getUserByID, userInfoUpdate, userAvatarUpdate,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUserByID);
usersRouter.patch('/me', userInfoUpdate);
usersRouter.patch('/me/avatar', userAvatarUpdate);

module.exports = usersRouter;
