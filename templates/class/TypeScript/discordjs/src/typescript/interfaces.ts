import type { CommandInteraction, GuildMember, Collection, HexColorString } from 'discord.js'
export interface IGuildDB {
	_id: string;
	guildID: string;
	guildName: string;
	prefix: string
	logChannel: string;
	welcomeMessage: string;
	expsysteme: boolean;
	serveurstats: boolean;
	invitations: boolean;
	rankcard: string;
	salonranks: string;
	modLogs: string;
	premium: boolean;
	reactionroles: Array<any>;
	modRoles: Array<string>;
	filter: Array<string>;
	ignoreChannel: Array<string>;
	links: Array<any>;
	commandes: Array<any>;
	shop: Array<any>;
	kickauto: boolean;
}

export interface IEmojis {
	[index: string]: string
}
export interface IColors {
	[index: string]: HexColorString
}

export interface IConfig {
	[index: string]: any
}

export interface IWebhookSend {
	avatar?: string;
	username?: string;
	embeds?: Array<any>;
	content?: string;
	code?: string;
}


/* ------------------GUILD-FUNCTIONS------------------ */
export interface IGuildMinDB {
	id: string;
	name: string;
}

/* ------------------OTHER------------------ */
export interface IObject {
	[index: string]: any
}

/* ------------------COMMANDS------------------ */
export interface ICommandOptions {
	name: string;
	aliases: string[];
	args?: Array<ICommandInfosArgs>;
	options?: Array<ICommandInfosArgs>;
	category: string;
	description: string;
	cooldown: number;
	userPermissions: string[];
	botPermissions: string[];
	subCommands: any[]
}

export interface ICommandInfosArgs {
	name: string;
	description: string;
	type: string;
	required: boolean;
}
export interface ICommandInteraction extends CommandInteraction {
	replySuccessMessage(content: string): Promise<void>
	replyErrorMessage(content: string): Promise<void>
	subcommand: string | null
	member: GuildMember
}
export interface ICommandArgs extends Collection<string, any> { }