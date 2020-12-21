/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5fddaa97970de041ec182698',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
