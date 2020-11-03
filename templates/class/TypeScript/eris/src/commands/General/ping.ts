import Eris from "eris";
import { Command as CMD, Client } from "../../";

export default class Command implements CMD {
    help = {
        name: "ping",
        description: "Ping command",
        aliases: ["pong"]
    }

    async run(client: Client, message: Eris.Message, args: string[]) {
        const msgCreated = message.createdAt;

        message.channel.createMessage("Pinging...")
            .then(m => {
                m.edit(`Pong! Took \`${m.createdAt - msgCreated}ms\``);
            });
    }
}