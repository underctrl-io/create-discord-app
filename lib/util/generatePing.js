module.exports = function () {
    return `const Command = require('../../util/Command.js');
class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [],
            category: ''
        });
    }

    async run (message, args) {
        return message.channel.send('Pong!')
    }
};

module.exports = Ping;
    `
}