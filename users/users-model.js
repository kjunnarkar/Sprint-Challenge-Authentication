const db = require('../database/dbConfig');

module.exports = {
    get,
    add,
    findBy
}

function get() {
    return db('users').select('id', 'username');
}

function add(user) {
    return db('users').insert(user);
}

function findBy(username) {
    return db('users').where(username);
}
