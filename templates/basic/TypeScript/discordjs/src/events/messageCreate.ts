"use strict";
import humanizeDuration from "humanize-duration";
import { runEvent, commands } from "../index";
import config from "../config";
let commandCooldown: any = {};

export default class {
  constructor(public client: runEvent) {
    this.client = client;
  }
  async execute(message: any) {
    const args = message.content.split(" ").slice(1);
    if (message.content.startsWith(config.prefix)) {
      let commandName: string[] = message.content
        .split(" ")[0]
        .slice(config.prefix.length);

      if (message.content.startsWith(config.prefix)) {
        let command: any =
          commands.get(commandName) ||
          /* @ts-ignore */
          commands.find(({ help: { aliases } }) =>
            aliases.includes(commandName)
          );
        if (command) {
          if (!command.conf.enabled)
            return message.channel.send("This command is currently disabled!");
          if (
            command.conf.developersOnly &&
            !config.developers.includes(message.author.id)
          )
            return message.channel.send("This command is for developers.");
          if (command.conf.nsfw && !message.channel.nsfw)
            return message.channel.send(
              "This command cannot be used outside of the nsfw channel!"
            );

          let userCooldown = commandCooldown[message.author.id];
          if (userCooldown) {
            const time = userCooldown[command.help.name] || 0;
            if (time && time > Date.now()) {
              return message.reply(
                "you have to wait {time} to use this command again".replace(
                  "{time}",
                  humanizeDuration(time - Date.now(), { round: true })
                )
              );
            }
          }

          try {
            command.execute(message, args);
            commandCooldown[message.author.id] = {};
            commandCooldown[message.author.id][command.help.name] =
              Date.now() + command.conf.cooldown;
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
}
