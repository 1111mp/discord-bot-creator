import fs from "node:fs/promises";
import path from "node:path";
import { ActionsCache } from "./ActionsCache.js";
export class Actions {
    dbc;
    dir;
    mods;
    constructor(dbc) {
        this.dbc = dbc;
        this.dir = path.join(dbc.dir, "mods", "actions");
        this.mods = new Map();
    }
    modExists(modName) {
        if (this.mods.has(modName)) {
            return true;
        }
        else {
            return false;
        }
    }
}
