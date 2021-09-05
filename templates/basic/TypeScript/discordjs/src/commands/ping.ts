import { CommandInteraction } from "discord.js";

import { SlashCommandBuilder } from '@discordjs/builders';
const data = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!');

const execute = async ( interaction: CommandInteraction ) => {
	return interaction.reply('Pong!');
}

export { data, execute }