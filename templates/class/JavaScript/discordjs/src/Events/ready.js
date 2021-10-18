const Event = require("../Structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    console.log(
      [
        `Logged in as ${this.client.user.tag}`,
        `Loaded ${this.client.commands.size} commands!`,
        `Loaded ${this.client.events.size} events!`,
      ].join("\n")
    );

    await this.client.user.setPresence({
      status: "idle",
      activities: [
        {
          name: "Type " + this.client.prefix + "help",
        },
      ],
    });

    const commands = [
      {
        name: "help",
        description: "Display all Bot Commands",
        options: [
          {
            name: "command",
            type: "STRING",
            description: "Command Name",
            required: false,
          },
        ],
      },
      {
        name: "inventory",
        description: "Displays a users inventory",
        options: [
          {
            name: "user",
            type: "USER",
            description: "User",
            required: false,
          },
        ],
      },
      {
        name: "balance",
        description: "Replys a user balance!",
        options: [
          {
            name: "user",
            type: "STRING",
            description: "The user which balance should be checked (optional)",
            required: false,
          },
        ],
      },
      {
        name: "airdrop",
        description: "Starts an airdrop!",
        options: [
          {
            name: "cookie_amount",
            type: "INTEGER",
            description: "The amount of cookies to be dropped",
            required: true,
          },
          {
            name: "time",
            type: "STRING",
            description: "The relative time like 1s, 2m, 1h",
            required: false,
          },
        ],
      },
      {
        name: "connect",
        description: "Connect your WAX Wallet!",
        options: [
          {
            name: "wam",
            type: "STRING",
            description: "WAM Address",
            required: true,
          },
        ],
      },
      {
        name: "gift",
        description: "Gift an item to a user!",
        options: [
          {
            name: "user",
            type: "USER",
            description: "Receiver",
            required: true,
          },
          {
            name: "item",
            type: "STRING",
            description: "Item Name",
            required: true,
          },
        ],
      },
      {
        name: "happyhour",
        description:
          "Provides the Bot Admins the opportunity to enable or disable the happy hour mode!",
        options: [
          {
            name: "toggle",
            type: "BOOLEAN",
            description: "Toggle",
            required: true,
          },
        ],
      },
      {
        name: "mine",
        description:
          "Mine cookies (only works if you own a golden cookie miner)",
        options: [],
      },
    ];
  }
};
