////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

// Importing the required libraries / methods
import { config } from 'dotenv';
import Client from './classes/client';

// setting up the enviroment variable
config();

// Creating the client
const client = new Client(process.env.TOKEN, {
    intents: ["GUILDS", "GUILD_MESSAGES"],
});