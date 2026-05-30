import { ipcMain } from 'electron';

import { botProjectService } from './bot-project.service';
import { dialogService } from './dialog.service';
import { projectService } from './project.service';

const services: IMainIpcServices = {
  dialog: dialogService,
  project: projectService,
  botProject: botProjectService,
};

export function registerIpcServices() {
  Object.entries(services).forEach(([moduleName, service]) => {
    Object.entries(service).forEach(([methodName, handlerFn]) => {
      const channel = `${moduleName}:${methodName}`;
      ipcMain.handle(
        channel,
        async (_event, ...args: ReadonlyArray<unknown>) => {
          try {
            return await (handlerFn as Function)(...args);
          } catch (error) {
            // TODO log
            console.error(`IPC Error on channel [${channel}]:`, error);
            throw error;
          }
        },
      );
    });
  });
}
