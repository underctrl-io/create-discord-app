////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

import * as dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";
import fs from "fs";

const config: {
    TOKEN: string,
    PREFIX: string
} = require("../config.js");

export class Client extends Discord.Client {
    commands: Discord.Collection<string, Command>;
    aliases: Discord.Collection<string, string>;

    constructor(options?: Discord.ClientOptions) {
        super(options);

        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
    }

    resolveCommand(name: string) {
        const byName = this.commands.get(name);
        if (byName) return byName;
        const byAlias = this.aliases.get(name);
        if (byAlias) return this.commands.get(byAlias);
        return undefined;
    }
}

export type CommandRun = (client: Client, message: Discord.Message, args: string[]) => any;

export interface CommandHelp {
    name: string;
    description: string;
    aliases: string[];
    category?: string;
}

export interface Command {
    run: CommandRun;
    help: CommandHelp;
    location?: string;
}

export interface CommandConstructor {
    new(): Command;
}

const client = new Client();

// load commands
// Read command dir and get ctg
fs.readdir(`${__dirname}/commands`, (error, ctg) => {
    if (error) throw error;

    // loop through ctg
    ctg.forEach(category => {

        // read each ctg and get command file
        fs.readdir(`${__dirname}/commands/${category}`, (err, commands) => {
            if (err) throw err;

            // Load commands in memory
            commands.forEach(command => {
                const cmd: Command = new (require(`${__dirname}/commands/${category}/${command}`).default as CommandConstructor);
                if (!cmd.help) throw new Error(`Invalid command file structure ${command}!`);

                // update data
                cmd.help.category = category;
                cmd.location = `${__dirname}/commands/${category}/${command}`;

                console.log(`Loading command ${command}...`);

                // load command in memory
                client.commands.set(cmd.help.name, cmd);
                if (cmd.help.aliases && Array.isArray(cmd.help.aliases)) cmd.help.aliases.forEach(alias => client.aliases.set(alias, cmd.help.name));
            });
        });
    });
});

// basic events
client.on("ready", () => {
    console.log("Bot is online!");
});
client.on("warn", console.warn);
client.on("error", console.error);

client.on("message", async (message) => {
    if (message.author.bot || !message.content.startsWith(config.PREFIX)) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(/\s+/);
    const cmd = args.shift()?.toLowerCase();

    if (!cmd) return;
    let command = client.resolveCommand(cmd);

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch(e) {
        console.error(e);
        message.channel.send(`Something went wrong while executing command "**${command}**"!`);
    }
});

client.login(config.TOKEN);