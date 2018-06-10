const express = require('express');
const HTTP_STATUS = require('http-status-codes');
const bodyParser = require('body-parser');
const constants = require('./src/config/constants.js');
const filesRouter = require('./src/routes/filesRoutes');
const OSRouter = require('./src/routes/OSRoutes');
const dirRouter = require('./src/routes/directoryRoutes');

const app = express();

app.use(bodyParser.text());
app.use(constants.ROUTES.FILES, filesRouter());
app.use(constants.ROUTES.OS, OSRouter());
app.use(constants.ROUTES.DIRECTORY, dirRouter());

// catch all route for all invalid API paths
app.all(constants.ROUTES.CATCH_ALL, (req, res) => {
  res.status(HTTP_STATUS.BAD_REQUEST).json(constants.ERROR.INVALID_API_CALL);
});

app.listen(constants.PORT, () => {
  console.log(`listening on port ${constants.PORT}`);
});
