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

    initGit() {
        const commands = ["git init", "git add .", "git commit -m \"initial commit\""];
        const finalizingLoader = ora(chalk.blueBright("Finalizing...")).start();

        for (const command of commands) {
            try {
                cp.execSync(this.path === "." ? command : `cd ${this.path} && ${command}`);
            } catch(e) { /* Do nothing */ }
        }

        finalizingLoader.succeed(chalk.greenBright("Successfully created discord bot project!"))
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
                await fse.writeFile(path.endsWith("/") ? path + ".gitignore" : path + "/.gitignore", "node_modules/\npackage-lock.json\n.env");
            }

            copyFileLoader.succeed(chalk.cyanBright("Finished copying files!"));
            const depInstaller = ora(chalk.blueBright("Installing dependencies...")).start();

            const command = this.getInstallCommand(ops.language);
            if (!command) return depInstaller.warn(chalk.yellowBright("Generated project but couldn't install dependencies, please try again manually!"));

            cp.exec(this.path === "." ? command : `cd ${this.path} && ${command}`, (error) => {
                if (error) return depInstaller.warn(chalk.yellowBright("Generated project but couldn't install dependencies, please try again manually!"));
                depInstaller.succeed(chalk.greenBright("Successfully Installed dependencies!"));

                return this.initGit();
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
            default:
                cmd = null;
        }

        return cmd;

    }

}

module.exports = Create;