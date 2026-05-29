import type { DBC } from './DBC.js';
import type { Action } from './interfaces/Action.js';
import type { ModName } from './types/ModName.js';

import path from 'node:path';

export class Actions {
  dbc: DBC;
  dir: string;
  mods: Map<ModName, Action>;

  constructor(dbc: DBC) {
    this.dbc = dbc;
    this.dir = path.join(dbc.dir, 'mods', 'actions');
    this.mods = new Map();
  }

  modExists(modName: ModName): boolean {
    if (this.mods.has(modName)) {
      return true;
    } else {
      return false;
    }
  }
}
