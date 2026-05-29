import type { DBC } from './DBC.js';
import type { ModName } from './types/ModName.js';
import type { Extension } from './interfaces/Extension.js';

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export class Extensions {
  dbc: DBC;
  dir: string;
  mods: Map<ModName, Extension>;

  constructor(dbc: DBC) {
    this.dbc = dbc;
    this.dir = path.join(dbc.dir, 'mods', 'extensions');
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
