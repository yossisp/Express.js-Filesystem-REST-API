const express = require('express');
const constants = require('../config/constants');
const filesController = require('../controllers/filesController');

const filesRouter = express.Router();

function router() {
  const { addFile, showPathsToFile, deleteFile } = filesController();
  filesRouter.route(`${constants.ROUTES.ROOT}:fileName`)
    .post(addFile)
    .put(addFile)
    .get(showPathsToFile)
    .delete(deleteFile);

  return filesRouter;
}

module.exports = router;
