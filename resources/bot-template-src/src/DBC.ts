import path from "node:path";
import { Bot } from "./Bot.js"; // n
import { Actions } from "./Actions.js"; // n
import { Events } from "./Events.js"; // n
import { Extensions } from "./Extensions.js"; // n
import { Files } from "./Files.js"; // y
import { Audio } from "./Audio.js"; // n
import pkg from "./../package.json" with { type: "json" };
import * as DiscordJS from "discord.js";

export class DBC {
  dir: string;
  version: string;
  DiscordJS: any;
  bot: Bot;
  actions: Actions;
  events: Events;
  extensions: Extensions;
  files: Files;
  audio: Audio;

  constructor() {
    /**
     * The main bot directory.
     */
    this.dir = path.join(import.meta.dirname, "..");
    /**
     * The bot version should be the same as the program version.
     */
    this.version = pkg.version;
    /**
     * Global reference for the discord.js module.
     */
    this.DiscordJS = DiscordJS;
    /**
     * An instance of the class responsible for the bot's.
     */
    this.bot = new Bot(this);
    /**
     * An instance of the class responsible for the bot's actions.
     */
    this.actions = new Actions(this);
    /**
     * An instance of the class responsible for the bot's events.
     */
    this.events = new Events(this);
    /**
     * An instance of the class responsible for the bot's extensions.
     */
    this.extensions = new Extensions(this);
    /**
     * An instance of the class responsible for the bot's files.
     */
    this.files = new Files(this);
    /**
     * An instance of the class responsible for the bot's audio.
     */
    this.audio = new Audio(this);
  }
}
