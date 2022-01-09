const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const Store = require('../store/mysql');
const response = require('../network/response');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', upsert);
router.put('/:table', upsert);

async function list(req, res, next) {
  try {
    const data = await Store.list(req.params.table);
    response.success(req, res, data, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}
async function get(req, res, next) {
  try {
    const data = await Store.get(req.params.table, req.params.id);
    response.success(req, res, data, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

async function upsert(req, res, next) {
  try {
    const data = await Store.upsert(req.params.table, req.body);
    response.success(req, res, data, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
