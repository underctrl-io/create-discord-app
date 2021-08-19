const Command = require("../../Base/Command");

class Reverse extends Command {

    constructor(client) {
        super(client, {
            name: "reverse",
            aliases: [],
            description: "Reverse your message"
        });
    }

    async run(message, args) {
        const m = args.join(" ");
        if (!m) return message.channel.send("Please specify a message to reverse!");

        return message.channel.send(m.split("").reverse().join(""));
    }

}

module.exports = Reverse;