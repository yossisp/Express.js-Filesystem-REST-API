const express = require('express');
const constants = require('../config/constants');
const dirController = require('../controllers/dirController');

const dirRouter = express.Router();

function router() {
  const { getFilesUnderDir } = dirController();
  dirRouter.route(`${constants.ROUTES.ROOT}:dirName`)
    .get(getFilesUnderDir);

  return dirRouter;
}

module.exports = router;
