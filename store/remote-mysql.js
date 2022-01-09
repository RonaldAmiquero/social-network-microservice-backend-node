const remote = require('./remote');
const config = require('../config');

module.exports = remote(config.mysqlService.host, config.mysqlService.port);
