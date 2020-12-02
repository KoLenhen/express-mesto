const path = require('path');
const getFileData = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  return getFileData(dataPath)
    .then(cards => res.status(200).send(cards))
    .catch(error => res.status(500).send(error));
};

module.exports = getCards;