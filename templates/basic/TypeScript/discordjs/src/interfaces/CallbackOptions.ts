import { CommandInteraction, GuildMember, Message } from 'discord.js';

export interface CallbackOptions {

    member: GuildMember;
    message?: Message;
    args?: Array<string>;
    interaction?: CommandInteraction;
}
