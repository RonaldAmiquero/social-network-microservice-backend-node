const { handle } = require('express/lib/router');
const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;
function handleCon() {
  connection = mysql.createConnection(dbconfig);
  connection.connect((err) => {
    if (err) {
      console.log('[db error]: ', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB CONNECTED');
    }
  });

  connection.on('error', (err) => {
    console.error('[db error]: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) return reject(err);
      console.log(results);
      resolve(results);
    });
  });
}

module.exports = {
  list,
};
