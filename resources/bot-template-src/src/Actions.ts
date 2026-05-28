import type { DBC } from "./DBC.js";
import type { ModName } from "./types/ModName.js";
import type { Action } from "./interfaces/Action.js";

import fs from "node:fs/promises";
import path from "node:path";
import { ActionsCache } from "./ActionsCache.js";

export class Actions {
  dbc: DBC;
  dir: string;
  mods: Map<ModName, Action>;

  constructor(dbc: DBC) {
    this.dbc = dbc;
    this.dir = path.join(dbc.dir, "mods", "actions");
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
