import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
export class Extensions {
  dbc;
  dir;
  mods;
  constructor(dbc) {
    this.dbc = dbc;
    this.dir = path.join(dbc.dir, 'mods', 'extensions');
    this.mods = new Map();
  }
}
