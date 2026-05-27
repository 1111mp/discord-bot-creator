import { iProject } from '../core/project';

export const projectService: IProjectService = {
  // create project
  async create(project: DBC.IProject) {
    const now = Date.now();
    const newPro = { ...project, createdAt: now, updatedAt: now };
    await iProject.create(newPro);
    return newPro;
  },
  // get all projects
  async getAll() {
    return iProject.projects;
  },
};
