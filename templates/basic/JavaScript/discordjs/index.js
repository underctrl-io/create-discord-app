////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

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
                const cmd = require(`${__dirname}/commands/${category}/${command}`);
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
    if (message.author.bot) return;
    if (message.content.indexOf(config.PREFIX) !== 0) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch(e) {
        console.error(e);
        message.channel.send(`Something went wrong while executing command "**${command}**"!`);
    }
});

client.login(config.TOKEN);