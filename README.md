# Express.js-FileSystem-API

### The REST API provides methods to create, delete, display directories/files in server local storage.

### Available API methods:

I published a Postman [collection](https://documenter.getpostman.com/view/4351524/RWEawhth#intro) which gives a short description on each method as well as provides examples. You can choose `FS-API-Local` to use the API locally or `FS-API-Heroku` environment.

Trying to access any other paths/routes of the API (using any HTTP verb) will result in `BAD_REQUEST` HTTP status as well as an error message.

___________

### To run the API locally:

Make sure you have `node` and `npm` installed. Run `npm install && npm start` in the command line. Default port is `http://localhost:3000` but can be changed in `constants.js`. The local version can run on platforms that support Unix style paths (includes macOS and Linux).

### Heroku version:

I'm also hosting the app on Heroku and you can use this base URL `https://yos-fs-api.herokuapp.com` to connect to the API. This is just a playground alternative to the local installation for showcasing the API calls. Please bear in mind that files created by other users may be present. Also Heroku may [delete](https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted) the uploaded files any time so this service should in no way be used as any kind of hosting solution.

### Project structure:
```
.
├── README.md
├── app.js
├── package.json
├── src
│   ├── config
│   │   └── constants.js
│   ├── controllers
│   │   ├── OSController.js
│   │   ├── dirController.js
│   │   └── filesController.js
│   ├── routes
│   │   ├── OSRoutes.js
│   │   ├── directoryRoutes.js
│   │   └── filesRoutes.js
│   └── utils
│       └── utils.js
└── storage