"use strict";
import { Client, Collection, Intents } from "discord.js";
import { readdir, readdirSync } from "fs";
import config from "./config";

export interface runEvent {
  cooldowns: any;
  commands: any;
  ws: any;
  client: Client;
  dev: boolean;
}

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
export const commands: Collection<string[], (event: runEvent) => any> =
  new Collection();
const dev: boolean = process.env.NODE_ENV === "dev";

readdir(__dirname + "/commands/", async (err: any, allFiles: string[]) => {
  if (err) return console.log(err);
  else
    for (let file of allFiles) {
      const props: string[] = readdirSync(`${__dirname}/commands/${file}`);
      for (let i of props) {
        const Load: any = await import(`${__dirname}/commands/${file}/${i}`);
        const Command: any = await new Load.default(client);
        commands.set(Command.help.name, Command);
      }
    }
});

readdir(__dirname + "/events", async (err: any, allFiles: string[]) => {
  if (err) return console.log(err);
  else
    for (let file of allFiles) {
      const eventName: string = file.split(".")[0];
      const Load: any = await import(`${__dirname}/events/${file}`);
      const event: any = await new Load.default(client);
      client.on(eventName, (...args: string[]) => event.execute(...args));
    }
});

client.login(config.token);
