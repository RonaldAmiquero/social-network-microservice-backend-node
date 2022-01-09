const express = require('express');
const config = require('../config.js');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.use('/api/post', post);

app.use(errors);

app.listen(config.postService.port, () => {
  console.log(
    `PostServer listen in http://localhost:${config.postService.port}/`
  );
});
