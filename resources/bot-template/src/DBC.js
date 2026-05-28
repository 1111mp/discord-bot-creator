import path from "node:path";
import { Bot } from "./Bot.js";
import { Actions } from "./Actions.js";
import { Events } from "./Events.js";
import { Extensions } from "./Extensions.js";
import { Files } from "./Files.js";
import { Audio } from "./Audio.js";
import pkg from "./../package.json" with { type: "json" };
import * as DiscordJS from "discord.js";
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
}
