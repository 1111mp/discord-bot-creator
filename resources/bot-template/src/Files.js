import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
export class Files {
    dbc;
    commandsDir;
    eventsDir;
    settingsPath;
    data;
    constructor(dbc) {
        this.dbc = dbc;
        this.commandsDir = path.join(dbc.dir, "data", "commands");
        this.eventsDir = path.join(dbc.dir, "data", "events");
        this.settingsPath = path.join(dbc.dir, "data", "settings.json");
        this.data = {
            commands: [],
            events: [],
            settings: {},
        };
    }
    async startBot() {
        await this.loadData();
        await this.initMods();
    }
    async verifyPath(dir) {
        try {
            await fs.access(dir);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async loadData() {
        await this.loadCommandsData();
        await this.loadEventsData();
        await this.loadSettingsData();
    }
    async loadCommandsData() {
        const files = await fs.readdir(this.commandsDir);
        for (const file of files) {
            try {
                const filePath = path.join(this.commandsDir, file);
                const json = await fs.readFile(filePath, "utf8");
                const data = JSON.parse(json);
                this.data.commands.push(data);
            }
            catch (err) {
                console.error("Błąd podczas ładowania danych komendy");
            }
        }
    }
    async loadEventsData() {
        const files = await fs.readdir(this.eventsDir);
        for (const file of files) {
            try {
                const filePath = path.join(this.eventsDir, file);
                const json = await fs.readFile(filePath, "utf8");
                const data = JSON.parse(json);
                this.data.events.push(data);
            }
            catch (err) {
                console.error("Błąd podczas ładowania danych eventu");
            }
        }
    }
    async loadSettingsData() {
        try {
            const json = await fs.readFile(this.settingsPath, "utf8");
            const data = JSON.parse(json);
            this.data.settings = data;
        }
        catch (err) {
            console.error("Błąd podczas ładowania danych ustawień");
        }
    }
    async initMods() {
        await this.initActionMods();
        await this.initEventMods();
        await this.initExtensionMods();
    }
    async initActionMods() {
        const files = await fs.readdir(this.dbc.actions.dir);
        for (const file of files) {
            const filePath = path.join(this.dbc.actions.dir, file);
            const modPath = pathToFileURL(filePath).href;
            const action = (await import(modPath)).default;
            this.dbc.actions.mods.set(action.name, action);
            if (action.mod) {
                action.mod(this.dbc);
            }
        }
    }
    async initEventMods() {
        const files = await fs.readdir(this.dbc.events.dir);
        for (const file of files) {
            const filePath = path.join(this.dbc.events.dir, file);
            const modPath = pathToFileURL(filePath).href;
            const event = (await import(modPath)).default;
            this.dbc.events.mods.set(event.name, event);
            if (event.mod) {
                event.mod(this.dbc);
            }
        }
    }
    async initExtensionMods() {
        const files = await fs.readdir(this.dbc.extensions.dir);
        for (const file of files) {
            const filePath = path.join(this.dbc.extensions.dir, file);
            const modPath = pathToFileURL(filePath).href;
            const extension = (await import(modPath)).default;
            this.dbc.extensions.mods.set(extension.name, extension);
        }
    }
}
