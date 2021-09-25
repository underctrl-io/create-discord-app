import type Bot from '../main';
export default class {
	bot: typeof Bot;
	constructor(bot: typeof Bot) {
		this.bot = bot;
	}
	run() {

		const data: any = [];
		const commandsCategories: string[] = [];
		this.bot.commands.forEach((c: any) => commandsCategories.push(c.category))
		const categories = [... new Set(commandsCategories)];
		for (const category of categories) {
			const commandsCategory = [...this.bot.commands].filter(([_, c]) => c.category === category);
			for (const c of commandsCategory) {
				if (c[1].subCommands?.length) {
					const commandOptions: any = [];
					c[1].subCommands.forEach((sc: any) => {
						commandOptions.push({
							type: 'SUB_COMMAND',
							name: sc.name,
							description: sc.description,
							required: sc.required,
							choices: sc.choices,
							options: sc.options
						})
					})
					data.push({
						type: 'SUB_COMMAND_GROUP',
						name: c[1].name,
						description: c[1].description,
						options: commandOptions
					})
				}
				else if (c[1].options && c[1].options.length) {
					const commandOptions: any = [];
					c[1].options.forEach((a: any) => {
						commandOptions.push({
							type: a.type || 'STRING',
							name: a.name,
							description: a.description,
							required: a.required,
							choices: a.choices,
							options: a.options
						})
					})
					data.push({
						name: c[1].name,
						description: c[1].description,
						options: commandOptions
					})
				}
				else {
					// No commands args and no subcommands
					data.push({
						name: c[1].name,
						description: c[1].description,
					})
				}

			}
		}
		this.bot.client.application!.commands.set(data, '809702809196560405');
		console.log(`Logged in as ${this.bot.client.user?.tag}!`);
	}

	// Sub command group

	/*
		const data: any = [];
		const commandsCategories: string[] = [];
		this.bot.commands.forEach((c: any) => commandsCategories.push(c.category))
		const categories = [... new Set(commandsCategories)];
		for (const category of categories) {
			const commandsCategory = [...this.bot.commands].filter(([_, c]) => c.category === category);
			const commandsData: any = [];
			commandsCategory.forEach((c: any) => {
				commandsData.push({
					type: 'SUB_COMMAND',
					name: c[1].name,
					description: c[1].description,
					required: c[1].required,
					choices: c[1].choices,
					options: c[1].options
				})
			})
			data.push({
				type: 'SUB_COMMAND_GROUP',
				name: category.toLocaleLowerCase(),
				description: `The commands of category ${category.toLocaleLowerCase()}.`,
				options: commandsData
			})
		}
		this.bot.client.application!.commands.set(data, '809702809196560405');
	*/
}
