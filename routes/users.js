const usersRouter = require('express').Router();
const { getUser, getUsers } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);

module.exports = usersRouter;
