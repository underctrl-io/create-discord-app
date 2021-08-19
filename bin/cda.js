#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";
import { handleCommand } from './commands.js';

const argv = yargs(hideBin(process.argv))
    .help(false)
    .version(false)
    .alias("h", "help")
    .alias("v", "version")
    .alias("c", "create")
    .alias("f", "force")
    .argv;

handleCommand(argv);