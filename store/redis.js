const redis = require('redis');
const config = require('../config');

let client;
(async () => {
  let url = `redis://:${config.redis.password}@${config.redis.host}:${config.redis.port}`;
  client = redis.createClient({
    url,
  });

  client.on('connection', (stream) => {
    console.log('redis client connected!');
  });
  client.on('error', (err) => {
    if (err) {
      console.log('Redis Client Error', err);
    }
  });

  await client.connect();
})();

function list(table) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.get(table);
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

function get(table, id) {}

async function upsert(table, data) {
  let key = table;
  if (data && data.id) {
    key = `${key}_${data.id}`;
  }
  await client.set(key, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
};
