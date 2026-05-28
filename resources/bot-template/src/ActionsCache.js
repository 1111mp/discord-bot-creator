export class ActionsCache {
    actions;
    index;
    guild;
    channel;
    message;
    interaction;
    constructor(options) {
        this.actions = options.actions;
        this.index = options.index || 0;
        this.guild = options.guild;
        this.channel = options.channel;
        this.message = options.message;
        this.interaction = options.interaction;
    }
}
