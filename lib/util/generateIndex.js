module.exports = function () {
    const boiler = `require('dotenv').config();
const { Client, Collection} = require('discord.js');
const fs = require('fs');
const path = require('path');
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./commands', (err, files) => {
    if(err) throw err;
    files.forEach(dir => {
        fs.readdir('./commands/'+dir, (_err, commands) => {
            if(_err) throw err;

            commands.forEach(cmd => {
                const Props = require(path.join(__dirname, 'commands', dir, cmd));
                const props = new Props(client);

                console.log('Loading '+cmd);
                client.commands.set(props.help.name, props);
                
                props.help.aliases.forEach(alias => {
                    
                    client.aliases.set(alias, props.help.name);
                });

            })
        })
    })
})

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', (message) => {
    if(message.author.bot || !message.guild) return;

    const prefix = '!';
    const mray = message.content.split(' ');
    const command = mray[0].toLowerCase();
    const args = mray.slice(1);
    const cmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));

    
    if(!cmd) return;
    if(!command.startsWith(prefix)) return;

    cmd.run(message, args);
})


//Change token in .env
client.login(process.env.TOKEN)
    `

    return boiler;
}