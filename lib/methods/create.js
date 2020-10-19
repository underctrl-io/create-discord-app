const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk');
const Creator = require('../Classes/Creator');

const languagePrompt = {
    name: 'language',
    message: 'Project type?',
    type: 'list',
    choices: [
        { name: 'Javascript', value: 'js' },
        { name: 'Typescript', value: 'ts' }
    ]
};

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

const libPrompt = {
    name: 'lib',
    type: 'list',
    message: `Choose a library:`,
    choices: [
        { name: 'Discord.JS', value: 'djs' },
        { name: 'Eris', value: 'eris' }
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
            // libPrompt
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
