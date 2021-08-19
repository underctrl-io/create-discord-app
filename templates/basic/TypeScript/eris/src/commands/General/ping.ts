import { Command as CMD } from "../../";

const Command: CMD = {
    async run(client, message, args) {
        const msgCreated = message.createdAt;

        message.channel.createMessage("Pinging...")
            .then(m => {
                m.edit(`Pong! Took \`${m.createdAt - msgCreated}ms\``);
            });
    },
    help: {
        name: "ping",
        description: "Ping command",
        aliases: ["pong"]
    }
}

export default Command;