const MDClient = require('./Structures/MDClient');
const config = require('../config.json');

const client = new MDClient(config);
client.start();
