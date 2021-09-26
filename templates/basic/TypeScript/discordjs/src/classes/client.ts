// Importing the required libraries
import Discord, { ApplicationCommandOption, ClientOptions, Collection, CommandInteraction } from 'discord.js';
import { readdirSync } from 'fs';

// Exporting the client class
export default class Client extends Discord.Client {
    // Defining the custom properties
    commands: Collection<string, command> = new Collection();
    folder: string = "src";
    extension: string = "ts";
    owners: string[] = ["441943765855240192"];

    constructor(token: string | undefined, options: ClientOptions) {
        super(options);

        // Changing the properties according to the NODE_ENV mode
        if (process.env.NODE_ENV !== undefined) {
            this.folder = "build";
            this.extension = "js";
        }

        // Setting the commands than handling the events
        this.setCommands();
        this.handleEvents();
        this.login(token);
    }

    setCommands() {
        // Reading the command directory
        readdirSync(`${process.cwd()}/${this.folder}/commands`).forEach(cat => {
            // Reading the  directories which are inside command directory
            const commands = readdirSync(`${process.cwd()}/${this.folder}/commands/${cat}`).filter(file => file.endsWith(this.extension));

            for (let i = 0; i < commands.length; i++) {

                const file = commands[i];

                // Getting the command
                const command: command = require(`../commands/${cat}/${file}`)?.default || {};
                // Throwing the error if the file do not have a command
                if (!command.data || !command.execute) throw new SyntaxError("A command should have `data` property and a `execute` method");

                // Setting the command
                this.commands.set(command.data.name, command);
            }
        })
    }

    // Handling the events
    handleEvents() {
        // Reading the event directory
        readdirSync(`${process.cwd()}/${this.folder}/events`).forEach(event => {
            // Getting the event
            const eventName = event.split(".")[0];
            const Event = require(`../events/${event}`)?.default;

            // Throwing the error if the file do not have execute function
            if (!Event || typeof (Event.execute) !== "function") throw new SyntaxError("An event should have a default export and a execute function");

            // handling the event
            if (Event.once) {
                this.once(eventName, (...args) => Event.execute(this, ...args))
            } else {
                this.on(eventName, (...args) => Event.execute(this, ...args))
            }
        })
    }
}

// Defining types
type commandExecute = (client: Client, message: CommandInteraction) => any;

interface command {
    data: {
        name: string,
        description: string,
        options?: ApplicationCommandOption[],
    },
    category?: string,

    execute: commandExecute
}