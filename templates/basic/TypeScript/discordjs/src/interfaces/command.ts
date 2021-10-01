import { ApplicationCommandOptionData } from 'discord.js';
import { CallbackOptions } from './CallbackOptions';

// eslint-disable-next-line no-shadow
export enum CommandType {
    NORMAL,
    SLASH,
    BOTH
}

export interface Command {

    name: string;
    type?: CommandType;
    aliases?: Array<string>;
    minArgs?: number;
    maxArgs?: number;
    expectedArgs?: string;
    options?: Array<ApplicationCommandOptionData>;
    permissions?: Array<string>;
    roles?: Array<string>;
    category: string;
    description: string;
    run: (args: CallbackOptions) => void;
}
