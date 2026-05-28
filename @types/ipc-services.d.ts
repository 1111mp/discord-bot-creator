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

  interface IMainIpcServices {
    dialog: IDialogService;
    project: IProjectService;
  }
}

export {};
