'use strict';

const { readdirSync } = require('fs');

/*
  This is an example for an event.
  There will always be the client object and the additional arguments of the specific event available.
 */
module.exports = {
  once: true,
  execute: client => {
    // This will consider the bot process as 'online' (only if running with pm2)
    if (typeof process.send === 'function') process.send('ready');

    const { interactions, application } = client;

    const interactionFiles = readdirSync('./src/interactions').filter(file => file.endsWith('.js'));
    for (const file of interactionFiles) {
      const interaction = require(`../interactions/${file}`);
      interactions.set(interaction.data.name, interaction);
    }

    return application.commands?.set([...interactions.map(i => i.data)]);
  },
};
