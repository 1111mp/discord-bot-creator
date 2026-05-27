interface IProjectService {
  create: (project: DBC.IProject) => Promise<DBC.IProject>;
  getAll: () => Promise<DBC.IProject[]>;
}

interface IMainIpcServices {
  project: IProjectService;
}
