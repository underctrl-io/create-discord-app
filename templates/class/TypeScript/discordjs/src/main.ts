import type { IConfig, IWebhookSend } from './typescript/interfaces';
import config from './config'
import { DiscordResolve } from 'discord-resolve';
import { Client, Intents, WebhookClient, CommandInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

declare module 'discord.js' {
	interface CommandInteraction {
		replySuccessMessage(content: string): any
		replyErrorMessage(content: string): any
	}
}

CommandInteraction.prototype.replySuccessMessage = function (content: string) {
	return this.reply(`${content}`);
};
CommandInteraction.prototype.replyErrorMessage = function (content: string) {
	return this.reply(`${content}`);
};

class Bot {
	public client: Client;
	private errorHook: WebhookClient;
	public owner: string;
	public commands: Map<string, any>;
	public cooldowns: Map<string, any>;
	protected config: IConfig;
	public token: string;
	public models: any;
	public util: DiscordResolve;
	constructor() {
		this.client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
			partials: ['CHANNEL', 'REACTION', 'USER', 'MESSAGE']
		})
		this.util = new DiscordResolve(this.client);
		this.config = config;
		this.token = config.tokens.discord;
		this.errorHook = new WebhookClient({ url: this.config.logs });
		this.owner = config.owner.username;
		this.commands = new Map();
		this.cooldowns = new Map();
		this.loadCommands();
		this.loadEvents();
		this.handleErrors();
		this.client.login(this.config.tokens.discord)
	}
	private async loadCommands(dir = join(__dirname, './commands')) {
		readdirSync(dir).filter(f => !f.endsWith('.js')).forEach(async dirs => {
			const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
			for (const file of commands) {
				const importFile = await import(`${dir}/${dirs}/${file}`);
				const CommandClass = importFile.default;
				const command = new CommandClass(this);
				this.commands.set(command.name, command);
				// const getFileName = await import(`../${dir}/${dirs}/${file}`);
				// this.commands.set(getFileName.help.name, getFileName);
				console.log(`Command loaded: ${command.name}`);
			};
		});
	}
	private async loadEvents(dir = join(__dirname, "./events")) {
		readdirSync(dir).forEach(async file => {
			const getFile = await import(`${dir}/${file}`).then(e => e.default)
			const evt = new getFile(this);
			const evtName = file.split(".")[0];
			this.client.on(evtName, (...args) => evt.run(...args));
			console.log(`Event loaded: ${evtName}`);
		});
	};

	private handleErrors() {
		process.on('uncaughtException', (error) => {
			console.warn(error);
			if (!this.client) return;
			this.errorHook.send({ content: "```js\n" + error.toString() + "```" });
		});
		process.on('unhandledRejection', (listener) => {
			console.warn(listener);
			if (!this.client) return;
			this.errorHook.send({ content: "```js\n" + listener!.toString() + "```" });
		});
		process.on('rejectionHandled', (listener) => {
			console.warn(listener);
			if (!this.client) return;
			this.errorHook.send({ content: "```js" + listener.toString() + "```" });
		});
		process.on('warning', (warning) => {
			console.warn(warning);
			if (!this.client) return;
			this.errorHook.send({ content: "```js" + warning.toString() + "```" });
		});
	}
	public log(options: IWebhookSend) {
		const webhook = new WebhookClient({ url: this.config.logs });
		webhook.send(options)
	}

}
const bot = new Bot();
export default bot;