export default {
  name: 'Bot Partials',
  meta: {
    version: '1.0.0',
    modVersion: '1.0.0',
    author: 'nxen',
    authorUrl: 'https://github.com/nxen816',
    downloadUrl:
      'https://github.com/nxen816/dbc-bot/mods/extensions/bot_partials.js',
  },
  fields: ['partials'],
  html() {
    return `here will be checkboxes for setting bot partials`;
  },
  mod(dbc) {
    dbc.bot.partials = () => {
      const partials = dbc.files.data.settings.partials;
      return partials;
    };
  },
};
