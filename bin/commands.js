import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CreateDiscordApp } from '../src/create.js';
import { prompts } from '../src/prompts.js';

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));

const languages = Object.fromEntries(prompts.language.choices.map(x => [ x.value, x.name ]));

const libraries = Object.fromEntries(prompts.lib.choices.map(x => [ x.value, x.name ]));

const help = `
    ${chalk.whiteBright("--discord")}       : Shows discord support server invite.
    ${chalk.whiteBright("--help")}          : Shows help menu.
    ${chalk.whiteBright("--version")}       : Shows CDA version.
    ${chalk.whiteBright("--create")}        : Create Project.

    Subcommands:
        ${chalk.whiteBright("--noGit")}     : Will not initialize git repository.
        ${chalk.whiteBright("--gitCommit")} : Custom git commit while initializing the git repository.
        ${chalk.whiteBright("--dir")}       : Custom directory to create the discord app.
        ${chalk.whiteBright("--force")}     : Will clear the directory where the app is going to be created.

    Examples:
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app .")}
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app --create --dir=projectDirName")}
`;

export default async function handleCommand(args) {
    if (args.help) console.log(`${chalk.cyanBright("Create Discord App")}\n\n${help}`);
    else if (args.version) console.log(chalk.whiteBright(`v${JSON.parse(fs.readFileSync('./package.json')).version}`));
    else if (args.discord) console.log(`${chalk.whiteBright("Join Our Discord Server")}:    ${chalk.blueBright("https://discord.gg/2SUybzb")}`);
    else if (args.create || (args._[0] && args._[0] === ".")) {
        if (args.create && !args.dir) return console.log(chalk.redBright("[ERROR] Argument `dir` was not specified!"));
        const { ok } = await inquirer.prompt([{
            name: "ok",
            type: "confirm",
            message: "Are you sure you want to generate discord bot project?"
        }]);

        if (!ok) return console.log(chalk.redBright("Exiting create-discord-app..."));
        const { type, language, lib, token } = await inquirer.prompt([prompts.type, prompts.language, prompts.lib, prompts.token]);
        let projectdir = `${__dirname}/templates/${type}/${languages[language]}/${libraries[lib]}`;
        if (!fs.existsSync(projectdir)) console.log(chalk.redBright("[Error] Couldn't locate template files!"));
        console.log(''); // Just prints an line. dont delete it.

        const cda = new CreateDiscordApp(args, projectdir);
        cda.init(token, language);
    } else console.log(`${chalk.whiteBright('No proper arguments has been found. Try checking the list of arguments.')}\n\n${help}`);
}
