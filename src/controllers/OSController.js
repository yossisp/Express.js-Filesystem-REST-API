const constants = require('../config/constants');

function OSController() {
  function getServerOS(req, res) {
    res.json(constants.MESSAGE.OS(process.platform));
  }

  return { getServerOS };
}

module.exports = OSController;
