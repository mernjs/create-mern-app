module.exports = {
  up(db) {
    return db.collection('users').insertMany([
      { name: 'ABC1', email: 'abc1@getnada.com' },
      { name: 'ABC2', email: 'abc2@getnada.com' },
      { name: 'ABC3', email: 'abc3@getnada.com' }
    ]);
  },

  down(db) {
    return db.collection('users').drop();
  }
};
