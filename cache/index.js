const express = require('express');
const config = require('../config');
const router = require('./network');
const errors = require('../network/errors');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/', router);
app.use(errors);
//Server
app.listen(config.cacheService.port, () => {
  console.log(
    `Cache Service listen in http://localhost:${config.cacheService.port}/`
  );
});
