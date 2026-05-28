import type { Event } from "./../../src/interfaces/Event.js";
import type { DBC } from "./../../src/DBC.js";

export default {
  name: "Any Message",

  description: "Triggers on any message sent in any channel the bot has access to.",

  category: "Messaging",

  meta: {
    version: "1.0.0",
    modVersion: "1.0.0",
    author: "nxen",
    authorUrl: "https://github.com/nxen816",
    downloadUrl: "https://github.com/nxen816/dbc-bot/mods/events/anyMessage.js",
  },

  fields: ["message"],

  html() {
    return `
      <label>Variable Name</label>
      <input type="text" id="channelId" placeholder="Enter the name of the variable in which to save the message." />
    `;
  },

  dependencies: {
    "discord.js": "14.26.4",
  },

  async mod(dbc: DBC) {
    const client = dbc.bot.client;
    const { Events } = await import("discord.js");
    client?.on(Events.MessageCreate, (message) => {
      // ...
    });
  },
} satisfies Event;
