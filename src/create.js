const chalk = require("chalk");
const fs = require("fs");
const fse = require("fs-extra");
const cp = require("child_process");
const ora = require("ora");
const symbols = require("log-symbols");

class Create {

    constructor(path = ".", source = null) {
        this.path = path || ".";
        this.source = source;
    }

    async init(token = null, ops = { language: null }) {
        if (!this.source) return console.log(symbols.error, chalk.redBright("No source file(s) specified!"));
        let path = this.path === "." ? process.cwd() : `${process.cwd()}/${this.path}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        fs.readdir(this.source, async (error, files) => {
            if (error) return console.log(symbols.error, chalk.redBright(error.message));

            const copyFileLoader = ora(chalk.cyanBright("Copying files...")).start();

            for (const file of files) {
                await fse.copy(`${this.source}/${file}`, `${path}/${file}`);
                await fse.writeFile(path.endsWith("/") ? path + ".env" : path + "/.env", `TOKEN=${token && typeof token === "string" ? token : "ENTER_YOUR_BOT_TOKEN"}`);
            }

            copyFileLoader.succeed(chalk.cyanBright("Finished copying files!"));
            const finalizingLoader = ora(chalk.blueBright("Finalizing...")).start();

            const command = this.getInstallCommand(ops.language);
            if (!command) return finalizingLoader.warn(chalk.yellowBright("Generated project but couldn't install dependencies, please try again manually!"));

            cp.exec(command, (error) => {
                if (error) return finalizingLoader.warn(chalk.yellowBright("Generated project but couldn't install dependencies, please try again manually!"));
                return finalizingLoader.succeed(chalk.greenBright("Successfully created discord bot project!"));
            });
        });
    }

    getInstallCommand(language = "js") {
        let cmd = "";
        switch(language) {
            case "node":
            case "js":
                cmd = "npm i";
                break;
            case "py":
                cmd = "pip3 install -r requirements.txt";
                break;
            default:
                cmd = null;
        }

        return cmd;

    }

}

module.exports = Create;