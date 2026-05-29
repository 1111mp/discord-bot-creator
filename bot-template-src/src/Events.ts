import type { DBC } from './DBC.js';
import type { ModName } from './types/ModName.js';
import type { Event } from './interfaces/Event.js';

import fs from 'node:fs/promises';
import path from 'node:path';

export class Events {
  dbc: DBC;
  dir: string;
  mods: Map<ModName, Event>;

  constructor(dbc: DBC) {
    this.dbc = dbc;
    this.dir = path.join(dbc.dir, 'mods', 'events');
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
