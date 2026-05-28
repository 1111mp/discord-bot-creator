import { contextBridge } from 'electron';

import { createIpcProxy } from '../main/services/client';

const { dialog: dialogService, project: projectService } = createIpcProxy();
const electronHandler = {
  ipcService: {
    dialog: {
      showOpenDialog: dialogService.showOpenDialog,
    },
    project: {
      create: projectService.create,
      getAll: projectService.getAll,
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
