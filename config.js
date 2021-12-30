module.exports = {
  api: {
    port: process.env.PORT || 3000,
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
};
