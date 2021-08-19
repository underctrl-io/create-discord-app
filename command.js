import chalk from 'chalk';
import fs from 'fs';
import create from './src/create.js';
import inq from 'inquirer';
import { prompts } from './src/prompts.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { prompt } = inq;
const pkg = fs.readFileSync('./package.json');
const content = JSON.parse(pkg);
const version = content.version;

const help = `
    ${chalk.cyanBright("Create Discord App")}

    ${chalk.whiteBright("--discord")}       : Shows discord support server invite
    ${chalk.whiteBright("--help")}          : Shows help menu
    ${chalk.whiteBright("--version")}       : Shows CDA version
    ${chalk.whiteBright("--create")}        : Create Project

    Examples:
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app .")}
        ${chalk.gray("$")} ${chalk.blueBright("create-discord-app --create --dir=projectDirName")}
`;

const command = async (args) => {
    if (args.help) {
        console.log(help);
    } else if (args.version) {
        console.log(chalk.whiteBright(`v${version}`));
    } else if (args.discord) {
        console.log(`${chalk.whiteBright("Join Our Discord Server")}:    ${chalk.blueBright("https://discord.gg/2SUybzb")}`);
    } else if (args.create || (args._[0] && args._[0] === ".")) {
        if (args.create && !args.dir) return console.log(chalk.redBright("dir was not specified!"));
        const { ok, type, language, lib, token } = await prompt([
            prompts.dir,
            prompts.type,
            prompts.language,
            prompts.lib,
            prompts.token
        ]);
        if (!ok) return console.log(chalk.redBright("CDA Exit..."));

        let projectdir;

        // basic
        if (type === "basic" && language === "javascript" && lib === "djs") projectdir = __dirname + "/templates/basic/JavaScript/discordjs";
        else if (type === "basic" && language === "javascript" && lib === "eris") projectdir = __dirname + "/templates/basic/JavaScript/eris";
        else if (type === "basic" && language === "typescript" && lib === "djs") projectdir = __dirname + "/templates/basic/TypeScript/discordjs";
        else if (type === "basic" && language === "typescript" && lib === "eris") projectdir = __dirname + "/templates/basic/TypeScript/eris";

        // class
        else if (type === "class" && language === "javascript" && lib === "djs") projectdir = __dirname + "/templates/class/JavaScript/discordjs";
        else if (type === "class" && language === "javascript" && lib === "eris") projectdir = __dirname + "/templates/class/JavaScript/eris";
        else if (type === "class" && language === "typescript" && lib === "djs") projectdir = __dirname + "/templates/class/TypeScript/discordjs";
        else if (type === "class" && language === "typescript" && lib === "eris") projectdir = __dirname + "/templates/class/TypeScript/eris";

        // none
        else return console.log(chalk.redBright("[Error] Couldn't locate template files!"));

        const cda = new create(args._[0] === "." ? "" : args.dir, projectdir, !!args.force);

        const lang = () => {
            let l;

            switch (language) {
                case "javascript":
                case "typescript":
                    l = "node";
                    break;
                default:
                    l = null;
            }

            return l;
        }

        cda.init(token, { language: lang() });
    } else {
        console.log(help);
    }
};
export { command };