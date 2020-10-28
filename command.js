const chalk = require("chalk");
const { version } = require("./package.json");
const create = require("./src/create");
const { prompt } = require("inquirer");
const prompts = require("./src/prompts");

const help = `
    ${chalk.cyanBright("Create Discord App")}

    ${chalk.whiteBright("--discord")}       : Shows discord support server invite
    ${chalk.whiteBright("--help")}          : Shows help menu
    ${chalk.whiteBright("--version")}       : Shows CDA version


    Example:   ${chalk.gray("$")} ${chalk.blueBright("create-discord-app .")}
`;

module.exports = async (args) => {
    if (args.help) {
        console.log(help);
    } else if (args.version) {
        console.log(chalk.whiteBright(`v${version}`));
    } else if (args.discord) {
        console.log(`${chalk.whiteBright("Join Our Discord Server")}:    ${chalk.blueBright("https://discord.gg/2SUybzb")}`); 
    } else if (args.create || args._[0] && args._[0] === ".") {
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
        else if (type === "class" && language === "typescript" && lib === "eris") projectdir = __dirname + "/templates/class/JavaScript/eris";
        else if (type === "class" && language === "typescript" && lib === "djs") projectdir = __dirname + "/templates/class/TypeScript/discordjs";
        else if (type === "class" && language === "typescript" && lib === "eris") projectdir = __dirname + "/templates/class/TypeScript/eris";

        // none
        else return console.log(chalk.redBright("[Error] Couldn't locate template files!"));

        const cda = new create(args._[0] === "." ? "." : args.dir, projectdir);

        const lang = () => {
            let l;

            switch(language) {
                case "javascript":
                case "typescript":
                    l = "node";
                    break;
                case "python":
                    l = "py";
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