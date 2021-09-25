"use strict";
import Command from '../../methods/commands';
import { runEvent } from '../../index';
export default class extends Command {
    constructor(client:runEvent) {
        super(client, {
            name: 'eval',
            aliases: ["evaled"],
            usage: 'eval command',
            enabled: true,
            nsfw: false,
            developersOnly: true,
            cooldown: 1000
        });
    };
    async execute(message:any, args:string[]) {
        try {
            const code:string = args.join(" ");
            let evaled:any = eval(code);
      
            if (typeof evaled !== "string")
              evaled = (await import("util")).inspect(evaled);
      
            message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
          } catch (err:any) {
              console.error(err)
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
          }
    };
};