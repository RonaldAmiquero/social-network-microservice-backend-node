const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'users';

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;

  if (!store) {
    store = require('../../../store/dummy');
  }
  if (!cache) {
    cache = require('../../../store/cacheespecificdb');
  }
  async function list() {
    let users = await cache.list(TABLE);

    if (!users) {
      console.log('No users found in cache');
      users = await store.list(TABLE);
      console.log('cache:------' + users);
      cache.upsert(TABLE, users);
    } else {
      console.log('Users found in cache');
    }
    return users;
  }
  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(body) {
    const user = {
      user_id: body.id ? body.id : nanoid(),
      name: body.name,
      username: body.username,
    };

    if (body.password || body.username) {
      await auth.upsert({
        id: user.user_id,
        username: user.username,
        password: body.password,
      });
    }
    return store.upsert(TABLE, user);
  }
  function follow(from, to) {
    return store.upsert(TABLE + '_followers', {
      user_from: from,
      user_to: to,
    });
  }
  function following(user_id) {
    const join = {};
    join[TABLE] = 'user_to';
    const query = { user_from: user_id };
    return store.query(TABLE + '_followers', query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
};
