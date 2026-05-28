import { Client, GatewayIntentBits, Partials } from "discord.js";
import { CommandType } from "./enums/CommandType.js";
export class Bot {
    dbc;
    $slash;
    $userContextMenu;
    $messageContextMenu;
    $text;
    $events;
    applicationCommandData;
    client;
    PrivilegedIntents;
    NonPrivilegedIntents;
    AllIntents;
    clientOptions;
    intents;
    partials;
    presence;
    sweepers;
    constructor(dbc) {
        this.dbc = dbc;
        this.$slash = new Map();
        this.$userContextMenu = new Map();
        this.$messageContextMenu = new Map();
        this.$text = new Map();
        this.$events = [];
        this.applicationCommandData = [];
        this.client = null;
        this.PrivilegedIntents =
            GatewayIntentBits.GuildMembers |
                GatewayIntentBits.GuildPresences |
                GatewayIntentBits.MessageContent;
        this.NonPrivilegedIntents =
            GatewayIntentBits.Guilds |
                GatewayIntentBits.GuildModeration |
                GatewayIntentBits.GuildExpressions |
                GatewayIntentBits.GuildIntegrations |
                GatewayIntentBits.GuildWebhooks |
                GatewayIntentBits.GuildInvites |
                GatewayIntentBits.GuildVoiceStates |
                GatewayIntentBits.GuildMessages |
                GatewayIntentBits.GuildMessageReactions |
                GatewayIntentBits.GuildMessageTyping |
                GatewayIntentBits.DirectMessages |
                GatewayIntentBits.DirectMessageReactions |
                GatewayIntentBits.DirectMessageTyping |
                GatewayIntentBits.GuildScheduledEvents |
                GatewayIntentBits.AutoModerationConfiguration |
                GatewayIntentBits.AutoModerationExecution |
                GatewayIntentBits.GuildMessagePolls |
                GatewayIntentBits.DirectMessagePolls;
        this.AllIntents = this.PrivilegedIntents | this.NonPrivilegedIntents;
        this.clientOptions = () => {
            return {};
        };
        this.intents = () => {
            return this.NonPrivilegedIntents;
        };
        this.partials = () => {
            return [];
        };
        this.presence = () => {
            return {};
        };
        this.sweepers = () => {
            return {};
        };
    }
    init() {
        this.initClient();
    }
    initClient() {
        const options = this.clientOptions();
        options.intents = this.intents();
        options.partials = this.partials();
        options.presence = this.presence();
        options.sweepers = this.sweepers();
        this.client = new Client(options);
    }
    reformatData() {
        this.reformatCommands();
        this.reformatEvents();
    }
    reformatCommands() {
        const commands = this.dbc.files.data.commands;
        if (!commands)
            return;
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command) {
                switch (command.type) {
                    case CommandType.Slash:
                        if (this.$slash.has(command.name)) {
                            console.warn("Zduplikowana komenda! Zostanie użyta pierwsza z listy.");
                        }
                        else {
                            this.$slash.set(command.name, command);
                        }
                        break;
                    case CommandType.UserContextMenu:
                        if (this.$userContextMenu.has(command.name)) {
                            console.warn("Zduplikowana komenda! Zostanie użyta pierwsza z listy.");
                        }
                        else {
                            this.$userContextMenu.set(command.name, command);
                        }
                        break;
                    case CommandType.MessageContextMenu:
                        if (this.$messageContextMenu.has(command.name)) {
                            console.warn("Zduplikowana komenda! Zostanie użyta pierwsza z listy.");
                        }
                        else {
                            this.$messageContextMenu.set(command.name, command);
                        }
                        break;
                    case CommandType.Text:
                        if (this.$text.has(command.name)) {
                            console.warn("Zduplikowana komenda! Zostanie użyta pierwsza z listy.");
                        }
                        else {
                            this.$text.set(command.name, command);
                        }
                        break;
                }
            }
        }
    }
    reformatEvents() {
        const events = this.dbc.files.data.events;
        if (!events)
            return;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event) {
            }
        }
    }
    createApiJsonFromCommand(command) { }
    mergeSubCommandIntoCommandData() { }
}
