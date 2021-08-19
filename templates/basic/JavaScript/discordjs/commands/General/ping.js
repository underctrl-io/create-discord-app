module.exports.run = async (client, message, args) => {
    const msgCreated = message.createdTimestamp;

    message.channel.send("Pinging...")
        .then(m => {
            m.edit(`Pong! Took \`${m.createdTimestamp - msgCreated}ms\``);
        });
};

module.exports.help = {
    name: "ping",
    description: "Ping command",
    aliases: ["pong"]
};