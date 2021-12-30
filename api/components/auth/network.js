const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

//Routes
router.post('/login', login);

//Internal functions

async function login(req, res) {
  try {
    console.log(req.body.password);
    const token = await Controller.login(req.body.username, req.body.password);
    response.success(req, res, token, StatusCodes.OK);
  } catch (e) {
    console.log(e);
    response.error(req, res, e.message, StatusCodes.BAD_REQUEST);
    next();
  }
}

module.exports = router;
