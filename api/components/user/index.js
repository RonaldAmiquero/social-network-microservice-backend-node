const store = require('../../../store/mysql');
const cacheStore = require('../../../store/redis');
const ctrl = require('./controller');

module.exports = ctrl(store, cacheStore);
