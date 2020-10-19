module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot || !message.guild) return;

        const prefix = '!';
        const mray = message.content.split(' ');
        const command = mray[0].toLowerCase();
        const args = mray.slice(1);
        const cmd = this.client.commands.get(command.slice(prefix.length)) || this.client.commands.get(this.client.aliases.get(command.slice(prefix.length)));


        if (!cmd) return;
        if (!command.startsWith(prefix)) return;

        cmd.run(message, args);
    }
}