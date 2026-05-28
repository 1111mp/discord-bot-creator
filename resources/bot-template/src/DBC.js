import path from "node:path";
import { Bot } from "./Bot.js";
import { Actions } from "./Actions.js";
import { Events } from "./Events.js";
import { Extensions } from "./Extensions.js";
import { Files } from "./Files.js";
import { Audio } from "./Audio.js";
import pkg from "./../package.json" with { type: "json" };
import * as DiscordJS from "discord.js";
import { ErrorType } from "./enums/ErrorType.js";
export class DBC {
    dir;
    version;
    DiscordJS;
    bot;
    actions;
    events;
    extensions;
    files;
    audio;
    constructor() {
        this.dir = path.join(import.meta.dirname, "..");
        this.version = pkg.version;
        this.DiscordJS = DiscordJS;
        this.bot = new Bot(this);
        this.actions = new Actions(this);
        this.events = new Events(this);
        this.extensions = new Extensions(this);
        this.files = new Files(this);
        this.audio = new Audio(this);
    }
    printError(type, ...args) {
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
                error(`[Duplicate Slash Command]\nSlash command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`);
                break;
            case ErrorType.DuplicateUserContextMenuCommand:
                error(`[Duplicate User Context Menu Command]\nUser context menu command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`);
                break;
            case ErrorType.DuplicateMessageContextMenuCommand:
                error(`[Duplicate Message Context Menu Command]\nMessage context menu command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`);
                break;
            case ErrorType.DuplicateTextCommand:
                error(`[Duplicate Text Command]\nText command with name "${args[0]}" already exists!\nThis duplicate will be ignored.`);
                break;
        }
    }
}
