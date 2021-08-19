const { Client: DiscordClient, Collection } = require("discord.js");
const fs = require("fs");

class Client extends DiscordClient {

    constructor(...args) {
        super(...args);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = require("../config");
        this.commandsDir = __dirname + "/../commands";
        this.eventsDir = __dirname + "/../events";
    }

    registerCommands() {
        fs.readdir(this.commandsDir, (error, ctg) => {
            if (error) throw error;

            ctg.forEach(category => {
                fs.readdir(`${this.commandsDir}/${category}`, (error, commands) => {
                    if (error) throw error;

                    commands.filter(command => command.endsWith(".js")).forEach(cmd => {
                        const Prop = require(`${this.commandsDir}/${category}/${cmd}`);
                        const prop = new Prop(this);

                        prop.help.category = category;
                        prop.location = `${this.commandsDir}/${category}/${cmd}`;

                        console.log(`Loaded command ${cmd}...`);
                        this.commands.set(prop.help.name, prop);
                        prop.help.aliases.forEach(alias => this.aliases.set(alias, prop.help.name));
                    });
                });
            });
        });
    }

    registerEvents() {
        fs.readdir(this.eventsDir, (error, events) => {
            if (error) throw error;

            events.filter(event => event.endsWith(".js")).forEach(event => {
                const prop = require(`${this.eventsDir}/${event}`);
                const ev = new prop(this);
                const eventName = event.split(".")[0];

                console.log(`Loading event ${eventName}...`);
                this.on(eventName, (...args) => ev.run(...args));
                delete require.cache[require.resolve(`${this.eventsDir}/${event}`)];
            });
        });
    }

    getCommand(name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    login(token = null) {
        this.registerCommands();
        this.registerEvents();

        return super.login(token);
    }

}

module.exports = Client;