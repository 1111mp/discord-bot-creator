import fs from "node:fs/promises";
import path from "node:path";
export class Events {
    dbc;
    dir;
    mods;
    constructor(dbc) {
        this.dbc = dbc;
        this.dir = path.join(dbc.dir, "mods", "events");
        this.mods = new Map();
    }
}
