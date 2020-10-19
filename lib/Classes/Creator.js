const { log, clear } = console
const executeCommand = require('../util/executeCommand');
const fs = require('fs-extra');
const writeFile = require('../util/writeFile');
const chalk = require('chalk');
const cp = require('shelljs').cp;

module.exports = class Creator {
    constructor(name, context, ops = {}) {
        this.name = name.replace(/ /g, '-');
        this.context = context;
        this.ops = ops;
    }

    async create() {
        const { name, context } = this
        const pm = this.ops.pm;
        const installSyntax = pm === 'yarn' ? 'install' : 'i';

        fs.readdir(context, (err, files) => {
            if (err) throw err;
            if (files.length !== 0) {
                console.log(chalk.red('Directory is not empty'));
                return process.exit();
            }
        })

        await clear()
        log(`✨  Generating files`)

        // generate package.json with dependencies
        const pkg = {
            name,
            version: '0.1.0',
            private: true,
            scripts: {
                start: 'node index.js'
            },
            dependencies: {
                'discord.js': '12.2.0',
                'dotenv': '8.2.0'
            }
        }

        await writeFile(context, {
            'package.json': JSON.stringify(pkg, null, 2),
            '.env': 'TOKEN=YOUR_TOKEN_HERE'
        });

        cp('-r', __dirname + '/../src/*', context)

        log('✨  Installing Dependencies')


        await executeCommand(`${pm} ${installSyntax}`);

        // log instructions
        log()
        log(`🎉  Successfully created project ${chalk.yellow(name)}.`)

        log(
            `👉  Start your bot up by:\n\n` +
            chalk.cyan(` ${chalk.gray('$')} ${pm} start`)
        )

        log()

    }


}

