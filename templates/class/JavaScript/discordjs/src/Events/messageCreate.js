const Event = require("../Structures/Event");
const config = require("../../config.json");

module.exports = class extends Event {
  async run(message) {
    const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

    if (!message.guild || message.author.bot) return;

    if (message.content.match(mentionRegex))
      message.channel.send(
        `My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`
      );

    if (!message.content.startsWith(config.prefix)) {
      return;
    }

    const prefix = config.prefix;

    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (command) {
      command.run(message, args);
    }
  }
};
