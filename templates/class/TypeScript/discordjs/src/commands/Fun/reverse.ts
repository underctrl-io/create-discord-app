import Discord from "discord.js";
import { Command as CMD, Client } from "../../";

export default class Command implements CMD {
    help = {
        name: "reverse",
        description: "Reverse command",
        aliases: []
    }

    async run(client: Client, message: Discord.Message, args: string[]) {
        const msg = args.join(" ");
        if (!msg) return message.channel.send("Please specify a message to reverse!");

        return message.channel.send(msg.split("").reverse().join(""));
    }
}