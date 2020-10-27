#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv))
    .help(false)
    .version(false)
    .alias("h", "help")
    .alias("v", "version")
    .argv;

const commands = require("../command.js");

commands(argv);