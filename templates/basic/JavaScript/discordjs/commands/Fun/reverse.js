module.exports.run = async (client, message, args) => {
    const msg = args.join(" ");
    if (!msg) return message.channel.send("Please specify a message to reverse!");

    return message.channel.send(msg.split("").reverse().join(""));
};

module.exports.help = {
    name: "reverse",
    description: "Reverse command",
    aliases: []
};