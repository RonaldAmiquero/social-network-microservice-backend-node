const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verifyAndDecoded(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(`decoded.auth_id: ${decoded.auth_id} && owner:${owner}`);
    if (decoded.auth_id !== owner) {
      throw error(
        getReasonPhrase(StatusCodes.UNAUTHORIZED),
        StatusCodes.UNAUTHORIZED
      );
    }
  },
  logged: function (req) {
    const decoded = decodeHeader(req);
  },
};

function getToken(auth) {
  if (!auth) {
    throw error('No viene token', StatusCodes.BAD_REQUEST);
  }
  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid Format');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verifyAndDecoded(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};
