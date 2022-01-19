/* require('dotenv').config(); */

module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  postService: {
    port: process.env.POST_SVR_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },

  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'CH3ATM1999',
    database: process.env.MYSQL_DATABASE || 'db_redsocial',
  },

  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-15103.c240.us-east-1-3.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 15103,
    password: process.env.REDIS_PASS || '6yzW2zapE9WiLjwbVDPYpdbIDZlMALsU',
  },
};
