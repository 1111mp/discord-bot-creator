import { projectsPath } from '../lib/dirs';
import { readYaml, saveYaml } from '../lib/helper';

export const DEFAULT_PROJECTS_DATA = {
  projects: [],
};

type IProjectData = {
  projects: DBC.IProject[];
};

class IProject {
  private data: IProjectData;

  constructor() {
    this.data = DEFAULT_PROJECTS_DATA;
  }

  get projects(): DBC.IProject[] {
    return this.data.projects;
  }

  async load() {
    try {
      const path = projectsPath();
      this.data = await readYaml<IProjectData>(path);
    } catch {
      // Handle error, maybe log it or set a default value
    }
  }

  async create(project: DBC.IProject) {
    this.data.projects.unshift(project);
    await this.save();
  }

  private async save() {
    await saveYaml(
      projectsPath(),
      this.data,
      '# Discord Bot Creator Projects Config File',
    );
  }
}

export const iProject = new IProject();
