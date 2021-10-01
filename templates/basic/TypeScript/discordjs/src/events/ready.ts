// Importing required stuff
import Client from "../classes/client";

export default {
    // Whether this event handler should work once or not
    once: true,

    // The real event handler
    execute: (client: Client) => {
        client.application?.commands.set([...client.commands.map(v => v.data)]).then(v => console.log(v.size))

        console.log(`${client.user ? client.user.username : "Bot"} is up and running!`);
    }
}