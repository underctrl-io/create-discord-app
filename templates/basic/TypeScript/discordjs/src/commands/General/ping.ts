import { Command as CMD } from "../../";

const Command: CMD = {
    async run(client, message, args) {
        const msgCreated = message.createdTimestamp;

        message.channel.send("Pinging...")
            .then(m => {
                m.edit(`Pong! Took \`${m.createdTimestamp - msgCreated}ms\``);
            });
    },
    help: {
        name: "ping",
        description: "Ping command",
        aliases: ["pong"]
    }
}

export default Command;