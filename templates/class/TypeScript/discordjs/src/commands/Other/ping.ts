import Command from '../CommandClass';
import type { ICommandInteraction } from '../../typescript/interfaces'

export default class extends Command {

	constructor(bot: any) {
		super(bot, {
			name: 'ping',
			aliases: [],
			options: [],
			description: 'Get ping of the bot',
			category: 'Other',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction) {
		const debut = Date.now();
		interaction.reply('Pong !')
			.then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${this.bot.client.ws.ping}ms\``));
	}
}