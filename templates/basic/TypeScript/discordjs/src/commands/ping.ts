import { Command, CommandType } from "../interfaces/command";
import { CallbackOptions } from "../interfaces/CallbackOptions";

export = {
  name: "ping",
  type: CommandType.SLASH,
  category: "Info",
  description: "Sends back pong",
  run: ({ interaction }: CallbackOptions) => {
    if (!interaction) return;
    interaction.reply("Pong!");
  },
} as Command;
