const Command = require('../../Util/Command.js');

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [],
            category: 'General'
        });
    }

    async run(message, args) {
        return message.channel.send('Pong!')
    }
};

module.exports = Ping;