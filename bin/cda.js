#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv))
    .help(false)
    .version(false)
    .alias("h", "help")
    .alias("v", "version")
    .argv;

import { command } from '../command.js';

command(argv);