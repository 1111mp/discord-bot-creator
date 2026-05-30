import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

import { createIpcProxy } from '../main/services/client';

const {
  dialog: dialogService,
  project: projectService,
  botProject: botProjectService,
} = createIpcProxy();
const electronHandler = {
  ipcService: {
    dialog: {
      showOpenDialog: dialogService.showOpenDialog,
    },
    project: {
      create: projectService.create,
      getAll: projectService.getAll,
    },
    botProject: {
      getSettings: botProjectService.getSettings,
      installDeps: botProjectService.installDeps,

      getRuntimeInfo: botProjectService.getRuntimeInfo,
      start: botProjectService.start,
      stop: botProjectService.stop,
      restart: botProjectService.restart,

      onRuntimeInfo: (fn: DBC.Runtime.OnRuntimeInfo) => {
        const subscription = (
          _event: IpcRendererEvent,
          info: DBC.Runtime.ProcessInfo,
        ) => fn(info);
        ipcRenderer.on('botProject:onRuntimeInfo', subscription);

        return () => {
          ipcRenderer.removeListener('botProject:onRuntimeInfo', subscription);
        };
      },
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
