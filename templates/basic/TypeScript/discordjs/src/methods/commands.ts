"use strict";
import { runEvent, client} from '../index';
export default class {
    conf: { enabled: boolean; cooldown: number; nsfw: boolean; developersOnly: boolean; };
    help: { name:string; aliases:any; description:string; usage:string; }
    constructor(public client:runEvent,{
    name = '',
	enabled = true,
    description = '',
    usage = '',
	aliases = new Array(),
	nsfw = false,
	developersOnly = false,
	cooldown = 3000

    }) {
        this.client = client;
        this.conf = { enabled, cooldown, nsfw, developersOnly }
        this.help = { name, aliases, description, usage }
    }
}