const notFoundRouter = require('express').Router();

notFoundRouter.get('*', (req, res) => {
  res.status(404).send('Запрашиваемый ресурс не найден');
});

module.exports = notFoundRouter;