#!/usr/bin/env node

const yargs = require('yargs');
const create = require('../lib/methods/create')

const args = yargs.argv;

if(args) {
    create(args.$1, {});
};