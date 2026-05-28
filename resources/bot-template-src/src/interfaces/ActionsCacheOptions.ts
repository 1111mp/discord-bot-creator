import type { Guild, Channel, Message, Interaction } from "discord.js";

export interface ActionsCacheOptions {
  actions: any[];
  index?: number;
  guild?: Guild;
  channel: Channel;
  message?: Message;
  interaction?: Interaction;
}
