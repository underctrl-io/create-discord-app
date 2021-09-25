import { MessageEmbed } from 'discord.js'
import Command from './CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from './../typescript/interfaces';

export default class extends Command {

	constructor(bot: any) {
		super(bot, {
			name: 'NAME',
			aliases: [],
			args: [
				{
					name: 'NAME_ARG',
					description: 'DESCRIPTION_ARG',
					type: 'STRING',
					required: true
				},
			],
			description: 'DESCRIPTION',
			category: 'CATEGORY',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		console.log(interaction);
		console.log(args);
		console.log(settings);
		console.log(MessageEmbed);
	}
}