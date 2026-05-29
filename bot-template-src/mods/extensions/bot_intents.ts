import type { Extension } from './../../src/interfaces/Extension.js';
import type { GatewayIntentBits } from 'discord.js';

export default {
  name: 'Bot Intents',

  meta: {
    version: '1.0.0',
    modVersion: '1.0.0',
    author: 'nxen',
    authorUrl: 'https://github.com/nxen816',
    downloadUrl:
      'https://github.com/nxen816/dbc-bot/mods/extensions/bot_intents.js',
  },

  fields: ['intents'],

  html() {
    return `here will be checkboxes for setting bot intents`;
  },

  mod(dbc) {
    dbc.bot.intents = (): GatewayIntentBits => {
      const intents = dbc.files.data.settings.intents;
      return intents;
    };
  },
} satisfies Extension;
