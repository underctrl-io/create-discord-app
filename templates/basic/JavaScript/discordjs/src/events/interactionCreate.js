'use strict';

module.exports = {
  once: false,
  execute: (client, interaction) => {
    if (!interaction.isCommand()) return;

    try {
      return client.interactions.get(interaction.commandName)?.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  },
};
