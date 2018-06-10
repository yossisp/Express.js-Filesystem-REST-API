const path = require('path');

const constants = {
  PORT: process.env.PORT || 3000,
  FILES_STORAGE_DIR: 'storage',
  EMPTY_STR: '',
  FIRST: 0,
  OUT_OF_BOUNDS: -1,
  GIT_KEEP: '.keep',
  ROOT: '/', // there's already ROUTES.ROOT but this ROOT is needed for operations in file system
  ROUTES: {
    ROOT: '/',
    FILES: '/files',
    OS: '/os',
    DIRECTORY: '/directory',
    CATCH_ALL: '*'
  },
  MESSAGE: {
    FILE_CREATED: {
      "message": "file successfully created"
    },
    FILE_DELETED: function FILE_DELETED(filePath) {
      return { "message": `${path.join(filePath)} deleted` };
    },
    OS: function OS(os) {
      return { "message": {
        "os": os
        }
      };
    },
    FILES_UNDER_DIR: function FILES_UNDER_DIR(dirName, files) {
      return { "message": {
            "directory": dirName,
            "files": files
          }
      };
    }
  },
  ERROR: {
    BAD_REQUEST: {
      "error": "please make sure dir param is specified"
    },
    FILE_ALREADY_EXISTS: {
      "error": "the file already exists in the specified directory"
    },
    WRITE_FILE_FAILED: {
      "error": "failed to write file"
    },
    INVALID_API_CALL: { "error": "invalid API method or incorrect usage. Please refer to API documentation" }
  },
  HTTP_METHOD: {
    POST: 'POST',
    PUT: 'PUT'
  },
};

module.exports = constants;
