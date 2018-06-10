const HTTP_STATUS = require('http-status-codes');
const constants = require('../config/constants');
const path = require('path');
const fs = require('fs');

function dirController() {
  function getFilesUnderDir(req, res) {
    const { dirName } = req.params;
    const searchPath = path.join(constants.FILES_STORAGE_DIR, dirName);
    if (fs.existsSync(searchPath)) {
      const files = fs.readdirSync(searchPath);
      res.json(constants.MESSAGE.FILES_UNDER_DIR(dirName, files));
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).send();
    }
  }

  return { getFilesUnderDir };
}

module.exports = dirController;
