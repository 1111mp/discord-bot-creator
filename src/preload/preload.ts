import { contextBridge } from 'electron';

import { createIpcProxy } from '../main/services/client';

const { project: projectService } = createIpcProxy();
const electronHandler = {
  ipcService: {
    project: {
      create: projectService.create,
      getAll: projectService.getAll,
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
