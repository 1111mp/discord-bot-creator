import { join } from 'node:path';

import { iProject } from '../data/project';
import { botTemplatePath } from '../lib/dirs';
import { createBotProject } from '../lib/helper';

export const projectService: IProjectService = {
  // create project
  async create(project: DBC.IProject) {
    const now = Date.now();
    const newPro = {
      ...project,
      path: join(project.path, project.name),
      createdAt: now,
      updatedAt: now,
    };
    await Promise.all([
      iProject.create(newPro),
      createBotProject({
        templatePath: botTemplatePath(),
        path: newPro.path,
        name: newPro.name,
        description: newPro.description,
      }),
    ]);
    return newPro;
  },
  // get all projects
  async getAll() {
    return iProject.projects;
  },
};
