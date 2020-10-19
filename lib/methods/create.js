const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk');
const Creator = require('../Classes/Creator');

const dirPrompt = {
    name: 'ok',
    type: 'confirm',
    message: `Generate project in current directory?`
}

const pmPrompt = {
    name: 'pm',
    type: 'list',
    message: `Choose a package manager:`,
    choices: [
        { name: 'Yarn', value: 'yarn' },
        { name: 'Npm', value: 'npm' }
    ]
}

async function create(projectName = '.', options) {
    const cwd = options.cwd || process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.');

    if (inCurrent) {

        const { ok, pm, language, lib } = await inquirer.prompt([
            dirPrompt,
            pmPrompt,
        ])

        if (!ok) {
            console.log(chalk.red('Please enter the appropriate directory and execute generation'));
            return;
        } else {

            const creator = new Creator(name, targetDir, {
                pm,
                language,
                lib
            });

            creator.create();
        }
    }
}

module.exports = (...args) => {
    return create(...args)
}
