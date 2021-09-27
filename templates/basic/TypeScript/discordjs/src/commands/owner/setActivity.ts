// Importing required stuff
import { CommandInteraction, MessageEmbed } from "discord.js";
import Client from "../../classes/client";

// Exporting the command
export default {
    // The command data
    data: {
        name: "set-activity",
        description: "Set the bot's activity",
        options: [{
            name: "status",
            type: "STRING",
            required: true,
            description: "The new status"
        }],
    },

    // The main function
    execute: async (client: Client, interaction: CommandInteraction) => {
        const embed = new MessageEmbed().setColor("RED").setTitle("Only owners can use this command");

        if (!client.owners.includes(interaction.user.id)) return interaction.reply({ embeds: [embed] });

        client.user?.setActivity({
            name: interaction.options.getString("status", true) || "No status",
            type: "CUSTOM",
        });

        interaction.reply({ content: `My new activiy is :\`${interaction.options.getString("status")}\`` });
    }
}