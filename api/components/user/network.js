const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const response = require('../../../network/response');
const Controller = require('./index');
const checkAuth = require('./secure');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/follow/:id', checkAuth('follow'), follow);
router.get('/:id/following', following);
router.post('/', upsert);
router.put('/', checkAuth('update'), upsert);

//Internal functions
async function list(req, res, next) {
  try {
    const lista = await Controller.list();
    response.success(req, res, lista, StatusCodes.OK);
  } catch (e) {
    /* response.error(req, res, e.message, StatusCodes.INTERNAL_SERVER_ERROR); */
    next(e);
  }
}

async function get(req, res, next) {
  try {
    const user = await Controller.get(req.params.id);
    response.success(req, res, user, StatusCodes.OK);
  } catch (e) {
    /* response.error(req, res, e.message, StatusCodes.INTERNAL_SERVER_ERROR); */
    next(e);
  }
}

async function upsert(req, res, next) {
  try {
    const userPost = await Controller.upsert(req.body);
    response.success(req, res, userPost, StatusCodes.CREATED);
  } catch (e) {
    /* response.error(req, res, e.message, StatusCodes.INTERNAL_SERVER_ERROR); */
    next(e);
  }
}

async function follow(req, res, next) {
  try {
    const data = await Controller.follow(req.user.auth_id, req.params.id);
    response.success(req, res, data, StatusCodes.CREATED);
  } catch (err) {
    next(err);
  }
}

async function following(req, res, next) {
  try {
    const data = await Controller.following(req.params.id);
    response.success(req, res, data, StatusCodes.OK);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
