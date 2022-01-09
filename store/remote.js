const axios = require('axios').default;

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function req(method, table, body = '') {
    let url = `${URL}/${table}`;
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        headers: { 'Content-Type': 'application/json' },
        url: url,
        data: body,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.error('Error with remote database', err);

          reject(err.message);
        });
    });
  }

  function list(table) {
    return req('GET', table);
  }

  function get(table, id) {}
  function upsert(table, data) {}
  function query(table, query, join) {}
  return {
    list,
  };
}

module.exports = createRemoteDB;
