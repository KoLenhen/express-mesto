const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/notFound');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});