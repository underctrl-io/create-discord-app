import Discord from "discord.js";
import { Command as CMD, Client } from "../../";

export default class Command implements CMD {
    help = {
        name: "ping",
        description: "Ping command",
        aliases: ["pong"]
    }

    async run(client: Client, message: Discord.Message, args: string[]) {
        const msgCreated = message.createdTimestamp;

        message.channel.send("Pinging...")
            .then(m => {
                m.edit(`Pong! Took \`${m.createdTimestamp - msgCreated}ms\``);
            });
    }
}