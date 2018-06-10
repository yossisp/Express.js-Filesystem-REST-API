const HTTP_STATUS = require('http-status-codes');
const path = require('path');
const fs = require('fs');
const constants = require('../config/constants');
const utilsFunctions = require('../utils/utils');

const { readDirPromise, unlinkFile, createFile } = utilsFunctions();
function filesController() {
  // creates new file, returns error is the file already exists under the specified dir
  function addFile(req, res) {
    const { fileName } = req.params;
    const { dir } = req.query;
    let textContent = req.body;

    // if there was no body input, set the input to be EMPTY_STR
    if (Object.keys(textContent).length === 0 && textContent.constructor === Object) {
      textContent = constants.EMPTY_STR;
    }
    if (dir === undefined || dir === constants.EMPTY_STR) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(constants.ERROR.BAD_REQUEST);
    } else {
      (async function createFileFromPost() {
        await createFile(dir, fileName, req.method, textContent)
          .then(() => {
            res.json(constants.MESSAGE.FILE_CREATED);
          })
          .catch((err) => {
            if (err.message === constants.ERROR.FILE_ALREADY_EXISTS.error) {
              res.json(constants.ERROR.FILE_ALREADY_EXISTS);
            } else {
              // all other errors originate from fs internal errors
              res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err);
            }
          });
      }());
    }
  }

  /*
  query params are ignored by design
   */
  function showPathsToFile(req, res) {
    const { fileName } = req.params;
    readDirPromise(fileName)
      .then((dirs) => {
        res.json(constants.MESSAGE.FILES_UNDER_DIR(constants.FILES_STORAGE_DIR, dirs));
      })
      .catch((err) => {
        res.json(err);
      });
  }

  /*
  if dir query param is provided then the file in that dir is deleted (if it exists).
  Else the first file in any dir that matched the filename provided is deleted.
   */
  function deleteFile(req, res) {
    const { fileName } = req.params;
    const { dir } = req.query;

    if (dir !== undefined && dir !== constants.EMPTY_STR) {
      // case when dir is not provided in the API call
      const filePath = path.join(constants.FILES_STORAGE_DIR, dir, fileName);
      if (!fs.existsSync(filePath)) {
        // no message is returned because the HTTP_STATUS.NOT_FOUND is self-explanatory
        res.status(HTTP_STATUS.NOT_FOUND).send();
      } else {
        unlinkFile(filePath, res);
      }
    } else {
      // case when dir is provided in the API call
      readDirPromise(fileName)
        .then((dirs) => { // dirs array contains all paths which contain the specified filename
          if (dirs.length > 0) {
            const filePath = path.join(constants.FILES_STORAGE_DIR, dirs[constants.FIRST]);
            unlinkFile(filePath, res);
          } else {
            res.status(HTTP_STATUS.NOT_FOUND).send();
          }
        })
        .catch(err => console.log(err));
    }
  }

  return { addFile, showPathsToFile, deleteFile };
}

module.exports = filesController;
