'use strict';

/*
  This is an example interaction command. You can add your options and other properties to the data object below.
 */
module.exports = {
  data: {
    name: 'example',
    description: 'Returns the time elapsed since January 1, 1970.',
    options: [
      {
        name: 'unit',
        description: 'The unit of the elapsed time.',
        type: 'STRING',
        required: false,
        choices: [
          { name: 'Days', value: 'days' },
          { name: 'Hours', value: 'hours' },
          { name: 'Minutes', value: 'minutes' },
          { name: 'Seconds', value: 'seconds' },
          { name: 'Milliseconds', value: 'milliseconds' },
        ],
      },
    ],
  },
  execute: interaction => {
    const unit = interaction.options.getString('unit') || 'milliseconds';

    let value = Date.now();
    if (unit === 'seconds') value /= 1000;
    if (unit === 'minutes') value /= 1000 * 60;
    if (unit === 'hours') value /= 1000 * 60 * 60;
    if (unit === 'days') value /= 1000 * 60 * 60 * 24;

    return interaction.reply(`A total of **${Math.round(value)}** ${unit} elapsed since January 1, 1970 00:00:00 UTC!`);
  },
};
