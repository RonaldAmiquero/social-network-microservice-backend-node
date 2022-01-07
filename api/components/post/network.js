const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

//Routes
router.get('/', list);
async function list(req, res, next) {
  try {
    const data = await Controller.list();
    response.success(req, res, data, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
