export default {
  name: 'Send Message To Console',
  description: 'Used to send messages to the console.',
  category: 'Messaging',
  subtitle() {
    return `Send a message to the console.`;
  },
  meta: {
    version: '1.0.0',
    modVersion: '1.0.0',
    author: 'nxen',
    authorUrl: 'https://github.com/nxen816',
    downloadUrl:
      'https://github.com/nxen816/dbc-bot/mods/actions/sendMessageToConsole.js',
  },
  fields: ['message'],
  html() {
    return `
      <label>Message to send</label>
      <input type="text" id="message" placeholder="Enter your message" />
    `;
  },
  action(cache) {
    const data = cache.actions[cache.index];
    const message = data.message;
    console.log(message);
  },
};
