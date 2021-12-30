const { StatusCodes, getReasonPhrase } = require('http-status-codes');

exports.success = function (
  req,
  res,
  message = getReasonPhrase(StatusCodes.OK),
  status = StatusCodes.OK
) {
  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};

exports.error = function (
  req,
  res,
  message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  status = StatusCodes.INTERNAL_SERVER_ERROR
) {
  res.status(status).send({
    error: true,
    status: status,
    body: message,
  });
};
