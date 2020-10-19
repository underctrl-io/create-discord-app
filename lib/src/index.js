/* Generated with create-discord-app */

require('dotenv').config();
const Client = require('./Util/Client')
const fs = require('fs');
const client = new Client();

client.handleCommands();

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const event_name = file.split(".")[0];
        console.log('Loading Event: ' + event_name);
        const event = new (require('./events/' + file))(client);
        client.on(event_name, (...args) => event.run(...args));
        delete require.cache[require.resolve('./events/' + file)];
    });
});


//Change token in .env
client.login(process.env.TOKEN)