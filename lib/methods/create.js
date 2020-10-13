const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk');
const Creator = require('../Classes/Creator');

async function create(projectName = '.', options) {
    const cwd = options.cwd || process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.');

    if (inCurrent) {

        const { ok } = await inquirer.prompt([
            {
                name: 'ok',
                type: 'confirm',
                message: `Generate project in current directory?`
            }
        ])

        if (!ok) {
            console.log(chalk.red('Please enter the appropriate directory and execute generation'));
            return;
        } else {

            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `Choose a package manager:`,
                    choices: [
                        { name: 'Yarn', value: 'yarn' },
                        { name: 'Npm', value: 'npm' }
                    ]
                }
            ]);

            const creator = new Creator(name, targetDir, {
                pm: action,
            });

            creator.create();
        }
    }
}

module.exports = (...args) => {
    return create(...args)
}
