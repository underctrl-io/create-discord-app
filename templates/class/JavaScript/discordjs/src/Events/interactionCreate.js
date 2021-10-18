const Event = require("../Structures/Event");
const config = require("../../config.json");

module.exports = class extends Event {
  async run(interaction) {
    if (!interaction.isCommand()) return;

    const cmd = interaction.commandName;

    const command =
      this.client.slashcommands.get(cmd.toLowerCase()) ||
      this.client.slashcommands.get(
        this.client.slashaliases.get(cmd.toLowerCase())
      );
    if (command) {
      command.run(interaction);
    }
  }
};
