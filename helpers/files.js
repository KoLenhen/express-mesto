const fsPromises = require('fs').promises;

const getFileData = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .catch((error) => console.error(error));

module.exports = getFileData;