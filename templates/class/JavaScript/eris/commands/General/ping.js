const Command = require("../../Base/Command");

class Ping extends Command {

    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["pong"],
            description: "Shows bot ping"
        });
    }

    async run(message, args) {
        const initial = message.createdAt;

        message.channel.createMessage("Pinging...")
            .then(m => {
                const latency = m.createdAt - initial;

                return m.edit(`Pong! Took \`${latency}ms\`.`);
            });
    }

}

module.exports = Ping;