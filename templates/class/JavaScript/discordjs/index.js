////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

require("dotenv").config();

const Client = require("./Base/Client");
const client = new Client();

client.login(client.config.TOKEN);