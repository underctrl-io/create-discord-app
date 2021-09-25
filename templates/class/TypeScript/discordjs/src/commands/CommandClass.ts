import type Bot from '../main';
import { ICommandOptions, ICommandInfosArgs } from '../typescript/interfaces';
export default class Command {
	protected bot;
	public util;
	protected name: string;
	protected aliases: string[];
	protected options: Array<ICommandInfosArgs> | undefined;
	protected category: string;
	protected description: string;
	protected cooldown: number;
	protected userPermissions: string[];
	protected botPermissions: string[];
	protected subCommands: string[];
	constructor(bot: typeof Bot, options: ICommandOptions) {
		this.bot = bot;
		this.util = this.bot.util;
		this.name = options.name
		this.aliases = options.aliases
		this.options = options.options
		this.category = options.category
		this.description = options.description
		this.cooldown = options.cooldown
		this.userPermissions = options.userPermissions
		this.botPermissions = options.botPermissions
		this.subCommands = options.subCommands
	}
}