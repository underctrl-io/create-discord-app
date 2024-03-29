class Message {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;

    const prefix = this.client.config.PREFIX;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();

    const command = this.client.getCommand(cmd);
    if (!command) return;

    try {
      await command.run(message, args);
    } catch (e) {
      console.error(e);
      return message.channel.createMessage(
        `Something went wrong while executing command "**${cmd}**"!`
      );
    }
  }
}

module.exports = Message;
