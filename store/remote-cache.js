const remote = require('./remote-cache');
const config = require('../config');

module.exports = remote(config.cacheService.host, config.cacheService.port);
