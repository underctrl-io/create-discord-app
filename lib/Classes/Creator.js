const path = require('path')
const EventEmitter = require('events');
const { log, clear } = console
const executeCommand = require('../util/executeCommand');
const package_info = require('package-info');
const getVersion = async (name) => (await package_info(name)).version
const fs = require('fs-extra');
const writeFile = require('../util/writeFile');
const chalk = require('chalk');
const createDir = (name) => fs.mkdirSync(name);
const modules = ['Moderation', 'Owner', 'Config']

module.exports = class Creator extends EventEmitter {
    constructor(name, context, ops = {}) {
        super()
        this.name = name;
        this.context = context;
        this.ops = ops;
    }

    async create() {
        const { name, context } = this
        const pm = this.ops.pm;
        const installSyntax = pm === 'yarn' ? 'install' : 'i';

        fs.readdir(context, (err, files) => {
            if(err) throw err;
            if(files.length !== 0) {
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
                'discord.js': await getVersion('discord.js'),
                'dotenv': '8.2.0'
            }
        }

        await writeFile(context, {
            'package.json': JSON.stringify(pkg, null, 2),
            'README.md': `# Discord Bot`,
            'index.js': require('../util/generateIndex')(),
            '.env': 'TOKEN=YOUR_TOKEN_HERE'
        })

        await writeFile(path.join(context, 'commands', 'General'), {
            'ping.js': require('../util/generatePing')()
        });

        await writeFile(path.join(context, 'util'), {
            'Command.js': require('../util/generateCommandFile')()
        });

        modules.forEach(dir => {
            createDir(`commands/${dir}`);
        })

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

