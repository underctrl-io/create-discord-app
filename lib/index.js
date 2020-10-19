const Database = require('easy-json-database');

module.exports = {
    create: require('./methods/create'),
    version: require ('./methods/v'),
    db: new Database()
};