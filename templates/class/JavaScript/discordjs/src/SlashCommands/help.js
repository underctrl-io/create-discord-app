const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../Structures/SlashCommand");

module.exports = class extends SlashCommand {
  constructor(...args) {
    super(...args, {
      aliases: [],
      description: "Displays all the commands in the bot",
      category: "Utilities",
      usage: "[command]",
    });
  }

  async run(interaction) {
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        `${interaction.guild.name} Help Menu`,
        interaction.guild.iconURL({ dynamic: true })
      )
      .setThumbnail(this.client.user.displayAvatarURL())
      .setFooter(
        `Requested by ${interaction.user.username}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    if (interaction?.options?.get("command")?.value !== undefined) {
      const cmd =
        this.client.slashcommands.get(
          interaction?.options?.get("command")?.value
        ) ||
        this.client.slashcommands.get(
          this.client.aliases.get(interaction?.options?.get("command")?.value)
        );

      if (!cmd)
        return interaction.reply({
          content: `Invalid Command named. \`${
            interaction?.options?.get("command")?.value
          }\``,
          ephemeral: true,
        });

      embed.setAuthor(
        `${cmd.name} Command Help`,
        this.client.user.displayAvatarURL()
      );
      embed.setDescription(
        `**❯ Aliases:** ${
          cmd.aliases.length
            ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ")
            : "No Aliases"
        }
**❯ Description:** ${cmd.description}
**❯ Category:** ${cmd.category}
**❯ Usage:** ${cmd.usage}`
      );

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } else {
      embed.setDescription(
        `These are the available commands for ${interaction.guild.name}
The bot's prefix is: /
Command Parameters: \`<>\` is strict & \`[]\` is optional`
      );
      let categories;
      if (!this.client.owners.includes(interaction.user.id)) {
        categories = this.client.utils.removeDuplicates(
          this.client.slashcommands
            .filter((cmd) => cmd.category !== "Owner")
            .map((cmd) => cmd.category)
        );
      } else {
        categories = this.client.utils.removeDuplicates(
          this.client.slashcommands.map((cmd) => cmd.category)
        );
      }

      for (const category of categories) {
        embed.addField(
          `**${category}**`,
          this.client.slashcommands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
            .join(" ")
        );
      }
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  }
};
