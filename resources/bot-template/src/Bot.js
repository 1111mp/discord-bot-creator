import { Client, GatewayIntentBits, Partials } from "discord.js";
export class Bot {
    dbc;
    $slash;
    $userContextMenu;
    $messageContextMenu;
    $text;
    $events;
    client;
    PrivilegedIntents;
    NonPrivilegedIntents;
    AllIntents;
    clientOptions;
    intents;
    partials;
    presence;
    constructor(dbc) {
        this.dbc = dbc;
        this.$slash = [];
        this.$userContextMenu = [];
        this.$messageContextMenu = [];
        this.$text = [];
        this.$events = [];
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
    }
    init() {
        this.initClient();
    }
    initClient() {
        const options = this.clientOptions();
        options.intents = this.intents();
        options.partials = this.partials();
        options.presence = this.presence();
        this.client = new Client(options);
    }
    reformatData() {
        this.reformatCommands();
        this.reformatEvents();
    }
    reformatCommands() { }
    reformatEvents() {
        const { files } = this.dbc;
        const events = files.data.events;
        if (!events)
            return;
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event) {
            }
        }
    }
}
