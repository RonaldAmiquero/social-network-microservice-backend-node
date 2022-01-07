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

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE user_id= ${id}`,
      (err, results) => {
        if (err) return reject(err);
        console.log(results);
        resolve(results);
      }
    );
  });
}

/* function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) return reject(err);
      console.log(results);
      resolve(results);
    });
  });
} */

/* function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, results) => {
        if (err) return reject(err);
        console.log(results);
        resolve(results);
      }
    );
  });
} */

function upsert(table, data) {
  /* if (data && data.user_id) return update(table, data);
  return insert(table, data); */
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.user_id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, results) => {
        if (err) return reject(err);
        resolve(results || null);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
