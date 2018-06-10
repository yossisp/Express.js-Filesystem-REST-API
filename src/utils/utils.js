const path = require('path');
const fs = require('fs');
const constants = require('../config/constants');
const HTTP_STATUS = require('http-status-codes');
/*
I decided to wrap most of the fs functions in promises because I/O operations
should be asynchronous and also promises look cleaner than callbacks
 */
function utilFunctions() {
  // filters dirsAndFiles array to directories only
  function getDirs(dirsAndFiles) {
    return dirsAndFiles.filter((dir) => {
      const fileStats = fs.statSync(path.join(constants.FILES_STORAGE_DIR, dir));
      return fileStats.isDirectory();
    });
  }

  // promise wrapper over fs.mkdir
  function mkDirPromise(dir) {
    return new Promise(((resolve, reject) => {
      fs.mkdir(path.join(constants.FILES_STORAGE_DIR, dir), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }));
  }

  // promise wrapper over fs.writeFile
  function writeFilePromise(writePath, textContent) {
    return new Promise((resolve, reject) => {
      fs.writeFile(writePath, textContent, (err) => {
        if (err) {
          reject(constants.ERROR.WRITE_FILE_FAILED);
        } else {
          resolve();
        }
      });
    });
  }

  /*
  returns Array of paths which contain the fileName
   */
  function readDirPromise(fileName) {
    return new Promise(((resolve) => {
      const dirsAndFiles = fs.readdirSync(path.join(constants.FILES_STORAGE_DIR));
      let currDirFiles = [];
      const resultArr = [];
      const dirs = getDirs(dirsAndFiles);
      dirs.forEach((dir) => {
        currDirFiles = fs.readdirSync(path.join(constants.FILES_STORAGE_DIR, dir));
        currDirFiles.forEach((file) => {
          if (file === fileName) {
            resultArr.push(path.join(dir, fileName));
          }
        });
      });
      resolve(resultArr);
    }));
  }

  function unlinkFile(filePath, res) {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send();
      } else {
        res.json(constants.MESSAGE.FILE_DELETED(filePath));
      }
    });
  }

  async function createFile(dir, fileName, httpMethod, textContent) {
    const searchPath = path.join(constants.FILES_STORAGE_DIR, dir, fileName);
    if (httpMethod === constants.HTTP_METHOD.POST && fs.existsSync(searchPath)) {
      throw new Error(constants.ERROR.FILE_ALREADY_EXISTS.error);
    } else {
      const fileExistsStatus = fs.existsSync(path.join(constants.FILES_STORAGE_DIR, dir));
      if (!fileExistsStatus) {
        await mkDirPromise(dir);
      }
      await writeFilePromise(searchPath, textContent);
    }
  }

  return { mkDirPromise, writeFilePromise,
    readDirPromise, unlinkFile, createFile };
}


module.exports = utilFunctions;
