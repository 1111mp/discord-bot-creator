import type { Message, Interaction } from "discord.js";
import type { ActionsCacheOptions } from "./interfaces/ActionsCacheOptions.js";

export class ActionsCache {
  actions: any[];
  index: number;
  message?: Message;
  interaction?: Interaction;

  constructor(options: ActionsCacheOptions) {
    this.actions = options.actions;
    this.index = options.index || 0;
    this.message = options.message;
    this.interaction = options.interaction;
  }
}
