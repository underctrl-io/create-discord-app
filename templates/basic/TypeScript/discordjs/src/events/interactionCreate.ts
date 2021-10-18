// Importing required stuff
import { CommandInteraction } from "discord.js";
import Client from "../classes/client";

// Exporting the event handler
export default {
  // Whether this event handler should work once or not
  once: false,

  // The real event handler
  execute: (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;

    try {
      // Running the command if it exist
      client.commands
        .get(interaction.commandName)
        ?.execute(client, interaction);
    } catch (e) {
      // logging if an error occured
      console.error(e);
    }
  },
};
