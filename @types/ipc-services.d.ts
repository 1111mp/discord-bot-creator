import type { OpenDialogOptions, OpenDialogReturnValue } from 'electron';

declare global {
  interface IProjectService {
    create: (project: DBC.IProject) => Promise<DBC.IProject>;
    getAll: () => Promise<DBC.IProject[]>;
  }

  interface IDialogService {
    showOpenDialog: (
      options: OpenDialogOptions,
    ) => Promise<OpenDialogReturnValue>;
  }

  interface IBotProjectService {
    getSettings: (projectId: string) => Promise<DBC.BotProject.Setting>;
    installDeps: (projectId: string) => Promise<void>;

    getRuntimeInfo: (projectId: string) => Promise<DBC.Runtime.ProcessInfo>;
    start: (projectId: string) => Promise<void>;
    stop: (projectId: string) => Promise<void>;
    restart: (projectId: string) => Promise<void>;
  }

  interface IMainIpcServices {
    dialog: IDialogService;
    project: IProjectService;
    botProject: IBotProjectService;
  }
}

export {};
