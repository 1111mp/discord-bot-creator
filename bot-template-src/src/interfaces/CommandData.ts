import type { CommandType } from './../enums/CommandType.js';

export interface CommandData {
  name: string;
  description?: string;
  type: CommandType;
  parameters?: Object[];
  actions: Object[];
}
