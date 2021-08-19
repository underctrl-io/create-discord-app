import chalk from 'chalk';
import fs from 'fs';
import { prompt } from 'inquirer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CreateDiscordApp } from '../src/create.js';
import { prompts } from '../src/prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const languages = {
    javascript: "JavaScript",
    typescript: "TypeScript"
};

const libraries = {
    djs: 'discordjs',
    eris: 'eris'
};

const help = `
    ${chalk.whiteBright("--discord")}       : Shows discord support server invite
    ${chalk.whiteBright("--help")}          : Shows help menu
    ${chalk.whiteBright("--version")}       : Shows CDA version
    ${chalk.whiteBright("--create")}        : Create Project

    Examples:
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app .")}
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app --create --dir=projectDirName")}
`;

export async function handleCommand(args) {
    console.log(args);
    if (args.help) console.log(`${chalk.cyanBright("Create Discord App")}\n\n${help}`);
    else if (args.version) console.log(chalk.whiteBright(`v${JSON.parse(fs.readFileSync('./package.json')).version}`));
    else if (args.discord) console.log(`${chalk.whiteBright("Join Our Discord Server")}:    ${chalk.blueBright("https://discord.gg/2SUybzb")}`);
    else if (args.create || (args._[0] && args._[0] === ".")) {
        if (args.create && !args.dir) return console.log(chalk.redBright("[ERROR] Argument `dir` was not specified!"));
        const { ok, type, language, lib, token } = await prompt([prompts.dir, prompts.type, prompts.language, prompts.lib, prompts.token]);
        if (!ok) return console.log(chalk.redBright("Exiting create-discord-app..."));

        let projectdir = `${__dirname}/templates/${type}/${languages[language]}/${libraries[lib]}`;
        if (!fs.existsSync(projectdir)) console.log(chalk.redBright("[Error] Couldn't locate template files!"));

        const cda = new CreateDiscordApp(args._[0] === "." ? "" : args.dir, projectdir, !!args.force);
        cda.init(token, { language, gitCommit: args.gitCommit });
    } else console.log(`${chalk.whiteBright('No proper arguments has been found. Try checking the list of arguments.')}\n\n${help}`);
}