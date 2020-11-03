import Eris from "eris";
import { Command as CMD, Client } from "../../";

export default class Command implements CMD {
    help = {
        name: "reverse",
        description: "Reverse command",
        aliases: []
    }

    async run(client: Client, message: Eris.Message, args: string[]) {
        const msg = args.join(" ");
        if (!msg) return message.channel.createMessage("Please specify a message to reverse!");

        return message.channel.createMessage(msg.split("").reverse().join(""));
    }
}