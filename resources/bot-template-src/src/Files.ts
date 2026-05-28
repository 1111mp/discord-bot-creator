import type { DBC } from "./DBC.js";
import type { Action } from "./interfaces/Action.js";
import type { Event } from "./interfaces/Event.js";
import type { Extension } from "./interfaces/Extension.js";

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ErrorType } from "./enums/ErrorType.js";

export class Files {
  dbc: DBC;
  commandsDir: string;
  eventsDir: string;
  settingsPath: string;
  data: any;

  constructor(dbc: DBC) {
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

  /**
   * Runs the entire bot project.
   */
  async startBot() {
    await this.loadData();
    await this.initMods();
  }

  async verifyPath(dir: string): Promise<boolean> {
    try {
      await fs.access(dir);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Loads and saves bot data in memory.
   */
  async loadData(): Promise<void> {
    await this.loadCommandsData();
    await this.loadEventsData();
    await this.loadSettingsData();
  }

  /**
   * Loads and saves commands data in memory.
   */
  async loadCommandsData(): Promise<void> {
    const files = await fs.readdir(this.commandsDir);
    for (const file of files) {
      try {
        const filePath = path.join(this.commandsDir, file);
        const json = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(json);
        this.data.commands.push(data);
      } catch (err) {
        this.dbc.printError(ErrorType.LoadCommandDataError, err);
      }
    }
  }

  /**
   * Loads and saves events data in memory.
   */
  async loadEventsData(): Promise<void> {
    const files = await fs.readdir(this.eventsDir);
    for (const file of files) {
      try {
        const filePath = path.join(this.eventsDir, file);
        const json = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(json);
        this.data.events.push(data);
      } catch (err) {
        this.dbc.printError(ErrorType.LoadEventDataError, err);
      }
    }
  }

  /**
   * Loads and saves settings data in memory.
   */
  async loadSettingsData(): Promise<void> {
    try {
      const json = await fs.readFile(this.settingsPath, "utf8");
      const data = JSON.parse(json);
      this.data.settings = data;
    } catch (err) {
      this.dbc.printError(ErrorType.LoadSettingsDataError, err);
    }
  }

  /**
   * Initializes and saves action, event, extension modules in memory.
   */
  async initMods(): Promise<void> {
    await this.initActionMods();
    await this.initEventMods();
    await this.initExtensionMods();
  }

  /**
   * Initializes and saves action modules in memory.
   */
  async initActionMods(): Promise<void> {
    const files = await fs.readdir(this.dbc.actions.dir);
    for (const file of files) {
      try {
        const filePath = path.join(this.dbc.actions.dir, file);
        const modPath = pathToFileURL(filePath).href;
        const action = (await import(modPath)).default;
        this.dbc.actions.mods.set(action.name, action);
        if (action.mod) {
          action.mod(this.dbc);
        }
      } catch (err) {
        this.dbc.printError(ErrorType.InitActionModError, err);
      }
    }
  }

  /**
   * Initializes and saves event modules in memory.
   */
  async initEventMods(): Promise<void> {
    const files = await fs.readdir(this.dbc.events.dir);
    for (const file of files) {
      try {
        const filePath = path.join(this.dbc.events.dir, file);
        const modPath = pathToFileURL(filePath).href;
        const event = (await import(modPath)).default;
        this.dbc.events.mods.set(event.name, event);
        if (event.mod) {
          event.mod(this.dbc);
        }
      } catch (err) {
        this.dbc.printError(ErrorType.InitEventModError, err);
      }
    }
  }

  /**
   * Initializes and saves extension modules in memory.
   */
  async initExtensionMods(): Promise<void> {
    const files = await fs.readdir(this.dbc.extensions.dir);
    for (const file of files) {
      try {
        const filePath = path.join(this.dbc.extensions.dir, file);
        const modPath = pathToFileURL(filePath).href;
        const extension: Extension = (await import(modPath)).default;
        this.dbc.extensions.mods.set(extension.name, extension);
      } catch (err) {
        this.dbc.printError(ErrorType.InitExtensionModError, err);
      }
    }
  }
}
