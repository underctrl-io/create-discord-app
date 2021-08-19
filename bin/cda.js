#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from "yargs/helpers";
import { handleCommand } from './commands.js';

const argv = yargs(hideBin(process.argv))
    .help(false)
    .version(false)
    .alias("h", "help")
    .alias("v", "version")
    .argv;

handleCommand(argv);