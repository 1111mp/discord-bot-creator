export default {
  name: 'Send Message',
  description: 'Used to send messages.',
  category: 'Messaging',
  subtitle() {
    return `Send a message to a channel.`;
  },
  meta: {
    version: '1.0.0',
    modVersion: '1.0.0',
    author: 'nxen',
    authorUrl: 'https://github.com/nxen816',
    downloadUrl:
      'https://github.com/nxen816/dbc-bot/mods/actions/sendMessage.js',
  },
  fields: ['channelId', 'msg'],
  html() {
    return `
      <label>Channel ID</label>
      <input type="text" id="channelId" placeholder="Enter the channel ID" />

      <label>Message to send</label>
      <input type="text" id="msg" placeholder="Enter your message" />
    `;
  },
  async action(cache) {
    const data = cache.actions[cache.index];
    const { MessageFlags } = await import('discord.js');
    const channelId = data.channelId;
    const msg = data.msg;
  },
};
