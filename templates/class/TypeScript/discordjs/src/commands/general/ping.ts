"use strict";
import Command from '../../methods/commands';
import { runEvent } from '../../index';
export default class extends Command {
    constructor(client:runEvent) {
        super(client, {
            name: 'delay',
            aliases: ['ping'],
            usage: 'ping command',
            enabled: true,
            nsfw: false,
            developersOnly: false,
            cooldown: 5 * 1000
        });
    };
    async execute(message:any, args:string[]) {
        const ping:number = this.client.ws.ping;
        message.channel.send(`Pong! ${ping}ms`);
    };
};