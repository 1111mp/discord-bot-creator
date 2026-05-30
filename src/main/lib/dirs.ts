import { app } from 'electron';
import { join } from 'node:path';

// TODO need to confirm the app home dir, and make it work on all platforms
// TODO user home dir first ?
const APP_ID = '.discord-bot-creator',
  APP_CONFIG = 'dbc.yaml';

let cachedAppHomeDir: string | null = null;
export function appHomeDir(): string {
  if (cachedAppHomeDir) {
    return cachedAppHomeDir;
  }

  try {
    const homeDir = app.getPath('home');
    return (cachedAppHomeDir = join(homeDir, APP_ID));
  } catch {
    const appDataDir = app.getPath('appData');
    const fallbackDir = join(appDataDir, APP_ID);
    return (cachedAppHomeDir = fallbackDir);
  }
}

export function dbcConfigPath(): string {
  return join(appHomeDir(), APP_CONFIG);
}

export function projectsPath(): string {
  return join(appHomeDir(), 'projects.yaml');
}

let cachedAppResourcesPath: string | null = null;
export function resourcesPath() {
  if (cachedAppResourcesPath) {
    return cachedAppResourcesPath;
  }

  if (app.isPackaged) {
    return (cachedAppResourcesPath = process.resourcesPath);
  }
  return (cachedAppResourcesPath = join(app.getAppPath(), 'resources'));
}

export function botTemplatePath() {
  return join(resourcesPath(), 'bot-template');
}

export function libNodePath() {
  return join(resourcesPath(), 'lib', 'node');
}

export function botProjectSettingPath(basePath: string) {
  return join(basePath, 'data', 'settings.json');
}
