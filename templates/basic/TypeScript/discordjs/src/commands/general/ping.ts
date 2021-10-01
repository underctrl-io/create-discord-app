// Importing required stuff
import { CommandInteraction } from "discord.js";
import Client from "../../classes/client";

// Exporting the command
export default {
    // The command data
    data: {
        name: "ping",
        description: "Get the bot's ping",
        options: [],
    },

    // The main function
    execute: async (client: Client, interaction: CommandInteraction) => {
        interaction.reply({ content: `My pong is : **${client.ws.ping} ms**` });
    }
}