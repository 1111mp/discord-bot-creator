import { iProject } from '../data/project';
import { botProjectSettingPath } from '../lib/dirs';
import { readJson, saveJson } from '../lib/helper';
import { botManager } from '../runtime/bot-manager';
import { installDeps as runtimeInstallDeps } from '../runtime/install-deps';

const DEFAULT_PROJECT_SETTINGS: DBC.BotProject.Setting = {
  depsInstalled: false,
  prefix: '!',
  token: '',
  clientId: '',
};

export const botProjectService: IBotProjectService = {
  getSettings: async (projectId: string) => {
    const project = iProject.projects.find((p) => p.id === projectId);
    if (!project) {
      throw new Error(`Not found project: ${projectId}`);
    }

    const settings = await readJson<DBC.BotProject.Setting>(
      botProjectSettingPath(project.path),
    );
    return settings ?? DEFAULT_PROJECT_SETTINGS;
  },

  installDeps: async (projectId: string) => {
    const project = iProject.projects.find((p) => p.id === projectId);
    if (!project) {
      throw new Error(`Not found project: ${projectId}`);
    }

    await runtimeInstallDeps(project.path);

    const botProSettingPath = botProjectSettingPath(project.path);
    const settings = await readJson<DBC.BotProject.Setting>(botProSettingPath);
    await saveJson(botProSettingPath, { ...settings, depsInstalled: true });
  },

  getRuntimeInfo: async (projectId: string) => {
    return botManager.getRuntime(projectId);
  },

  start: async (projectId: string) => {
    const project = iProject.projects.find((p) => p.id === projectId);
    if (!project) {
      throw new Error(`Not found project: ${projectId}`);
    }

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await botManager.start(project);
  },

  stop: async (projectId: string) => {
    await botManager.stop(projectId);
  },

  restart: async (projectId: string) => {
    const project = iProject.projects.find((p) => p.id === projectId);
    if (!project) {
      throw new Error(`Not found project: ${projectId}`);
    }

    await botManager.restart(project);
  },
};
