import type { Message, Interaction } from "discord.js";

export interface ActionsCacheOptions {
  actions: any[];
  index?: number;
  message?: Message;
  interaction?: Interaction;
}
