import type { Guild, Channel, Message, Interaction } from "discord.js";
import type { ActionsCacheOptions } from "./interfaces/ActionsCacheOptions.js";

export class ActionsCache {
  actions: any[];
  index: number;
  guild?: Guild;
  channel: Channel;
  message?: Message;
  interaction?: Interaction;

  constructor(options: ActionsCacheOptions) {
    this.actions = options.actions;
    this.index = options.index || 0;
    this.guild = options.guild;
    this.channel = options.channel;
    this.message = options.message;
    this.interaction = options.interaction;
  }
}
