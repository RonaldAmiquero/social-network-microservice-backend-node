const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'users';

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }
  function list() {
    return store.list(TABLE);
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
