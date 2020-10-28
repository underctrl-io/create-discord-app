import { Command as CMD } from "../../";

const Command: CMD = {
    async run(client, message, args) {
        const msg = args.join(" ");
        if (!msg) return message.channel.send("Please specify a message to reverse!");

        return message.channel.send(msg.split("").reverse().join(""));
    },
    help: {
        name: "reverse",
        description: "Reverse command",
        aliases: []
    }
}

export default Command;