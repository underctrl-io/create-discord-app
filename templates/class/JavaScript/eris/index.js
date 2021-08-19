////////////////////////////////////////////
/////         Create Discord App       /////
////////////////////////////////////////////

require("dotenv").config();
const config = require("./config")

const Client = require("./Base/Client");
const client = new Client(config.TOKEN);

client.login();
