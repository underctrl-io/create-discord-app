import { readdirSync, lstatSync } from 'fs';
import { Client } from 'discord.js';
import { join } from 'path';
import logger from '../core/logger';
export class ModLoader {

    private client: Client;
    constructor(client: Client) {

        this.client = client;
        try {
            this._load('../mods/').then((count) => { logger.info(`[ModLoader] ${count} mods loaded.`); });
        }
        catch (error) {
            logger.info('[ModLoader] No mods loaded.');
            logger.error(error);
        }
    }

    /**
     * Recursive inner function to call the mods from the given directory
     * @param {string} dir
     * @returns {number} sum of loaded mods
     */
    async _load(dir: string) : Promise<number> {
        let count = 0;
        const files = readdirSync(join(__dirname, dir));
        for (const file of files) {
            const stat = lstatSync(join(__dirname, dir, file));
            if (stat.isDirectory()) {
                count += await this._load(join(dir, file));
            }
            else {
                if (file.startsWith('.')) continue;
                const { default: mod } = await import(join(__dirname, dir, file));
                mod(this.client);
                ++count;
            }
        }
        return count;
    }
}
