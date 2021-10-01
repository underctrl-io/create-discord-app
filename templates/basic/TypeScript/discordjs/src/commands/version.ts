import { Command, CommandType } from '../interfaces/command';
import { CallbackOptions } from '../interfaces/CallbackOptions';
import { VERSION } from '../version';

const generateReplyText = (numGuilds: number) => {
    return `The version of this bot is \`${VERSION}\`, running on ${numGuilds} Server${numGuilds > 1 ? 's' : ''}.`;
};

export = {
    name: 'version',
    type: CommandType.BOTH,
    category: 'Info',
    description: 'Version of the bot.',
    maxArgs: 0,
    run: async ({ message, interaction }: CallbackOptions) => {

        if (message) {
            const numGuilds = message.client.guilds.cache.size;
            message.reply(generateReplyText(numGuilds));

        }
        // slash command
        else if (interaction) {
            if (!interaction.channel) return;
            const numGuilds = interaction.channel.client.guilds.cache.size;
            interaction.reply(generateReplyText(numGuilds));
        }
    },
} as Command;
