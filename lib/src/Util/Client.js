const { Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

class Bot extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        this.aliases = new Collection();
    }

    handleCommands() {
        fs.readdir('./commands', (err, files) => {
            if (err) throw err;
            files.forEach(dir => {
                fs.readdir('./commands/' + dir, (_err, commands) => {
                    if (_err) throw err;

                    commands.forEach(cmd => {
                        const Props = require(path.join('..', 'commands', dir, cmd));
                        const props = new Props(this);

                        console.log('Loading ' + cmd);
                        this.commands.set(props.help.name, props);

                        props.help.aliases.forEach(alias => {
                            this.aliases.set(alias, props.help.name);
                        });
                    })
                })
            })
        })
    }
};

module.exports = Bot;