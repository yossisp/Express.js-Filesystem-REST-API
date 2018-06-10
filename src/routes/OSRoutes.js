const express = require('express');
const constants = require('../config/constants');
const OSController = require('../controllers/OSController');

const OSRouter = express.Router();

function router() {
  const { getServerOS } = OSController();
  OSRouter.route(constants.ROUTES.ROOT)
    .get(getServerOS);

  return OSRouter;
}

module.exports = router;
