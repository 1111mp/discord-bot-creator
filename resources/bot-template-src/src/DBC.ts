import path from "node:path";
import { Bot } from "./Bot.js"; // n
import { Actions } from "./Actions.js"; // n
import { Events } from "./Events.js"; // n
import { Extensions } from "./Extensions.js"; // n
import { Files } from "./Files.js"; // y
import { Audio } from "./Audio.js"; // n
import pkg from "./../package.json" with { type: "json" };
import * as DiscordJS from "discord.js";
import { ErrorType } from "./enums/ErrorType.js";

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

  printError(type: ErrorType, ...args: any) {
    const { log, warn, error } = console;
    switch (type) {
      case ErrorType.LoadCommandDataError:
        error(`[Failed to load command data]\n`, args[0]);
        break;
      case ErrorType.LoadEventDataError:
        error(`[Failed to load event data]\n`, args[0]);
        break;
      case ErrorType.LoadSettingsDataError:
        error(`[Failed to load settings data]\n`, args[0]);
        break;

      case ErrorType.InitActionModError:
        error(`[Error initializing action mod]\n`, args[0]);
        break;
      case ErrorType.InitEventModError:
        error(`[Error initializing event mod]\n`, args[0]);
        break;
      case ErrorType.InitExtensionModError:
        error(`[Error initializing extension mod]\n`, args[0]);
        break;

      case ErrorType.MissingActionMod:
        error(`[Missing "${args[0]}" action mod]`);
        break;
      case ErrorType.MissingEventMod:
        error(`[Missing "${args[0]}" event mod]`);
        break;
      case ErrorType.MissingExtensionMod:
        error(`[Missing "${args[0]}" extension mod]`);
        break;

      case ErrorType.DuplicateSlashCommand:
        error(
          `[Duplicate Slash Command]\nSlash command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`,
        );
        break;
      case ErrorType.DuplicateUserContextMenuCommand:
        error(
          `[Duplicate User Context Menu Command]\nUser context menu command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`,
        );
        break;
      case ErrorType.DuplicateMessageContextMenuCommand:
        error(
          `[Duplicate Message Context Menu Command]\nMessage context menu command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`,
        );
        break;
      case ErrorType.DuplicateTextCommand:
        error(
          `[Duplicate Text Command]\nText command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`,
        );
        break;
    }
  }
}
