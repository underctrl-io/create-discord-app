const chalk = require("chalk");
const fs = require("fs");
const fse = require("fs-extra");
const cp = require("child_process");

class Create {

    constructor(path = ".", source = null) {
        this.path = path || ".";
        this.source = source;
    }

    async init(token = null, ops = { language: null }) {
        if (!this.source) return console.log(chalk.redBright("[Error] No source file(s) specified!"));
        let path = this.path === "." ? process.cwd() : `${process.cwd()}/${this.path}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        fs.readdir(this.source, (error, files) => {
            if (error) return console.log(chalk.redBright(error.message));

            console.log(chalk.cyanBright("\n\nCopying files..."));

            files.forEach(file => {
                fse.copySync(`${this.source}/${file}`, `${path}/${file}`);
                fs.writeFileSync(path.endsWith("/") ? path + ".env" : path + "/.env", `TOKEN=${token && typeof token === "string" ? token : "ENTER_YOUR_BOT_TOKEN"}`);
            });
            console.log(chalk.cyanBright("\nFinished copying files!"));
            console.log(chalk.blueBright("\nFinalizing..."));

            const command = this.getInstallCommand(ops.language);
            if (!command) return console.log(chalk.redBright("Generated project but couldn't install dependencies, please try again manually!"));

            cp.exec(command, (error) => {
                if (error) return console.log(chalk.redBright("Generated project but couldn't install dependencies, please try again manually!"));
                return console.log(chalk.greenBright("\nSuccessfully created discord bot project!"));
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