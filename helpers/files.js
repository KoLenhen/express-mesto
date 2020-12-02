const fsPromises = require('fs').promises;

const getFileData = (pathToFile) => {
  return fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
    .then(data => JSON.parse(data))
    .catch(error => console.error(error));
};

module.exports = getFileData;