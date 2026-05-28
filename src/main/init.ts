import { ensureDir, pathExists } from 'fs-extra';

import { DEFAULT_DBC_CONFIG } from './data/dbc';
import { DEFAULT_PROJECTS_DATA, iProject } from './data/project';
import { appHomeDir, dbcConfigPath, projectsPath } from './lib/dirs';
import { save_yaml } from './lib/helper';

async function init_config() {
  try {
    await ensureDir(appHomeDir());

    const tasks = [
      {
        path: dbcConfigPath(),
        data: DEFAULT_DBC_CONFIG,
        comment: '# Discord Bot Creator Config File',
      },
      {
        path: projectsPath(),
        data: DEFAULT_PROJECTS_DATA,
        comment: '# Discord Bot Creator Projects Config File',
      },
    ];
    await Promise.all(
      tasks.map(async ({ path, data, comment }) => {
        if (!(await pathExists(path))) {
          await save_yaml(path, data, comment);
        }
      }),
    );
  } catch {
    // log
  }
}

async function init_data() {
  await iProject.load();
}

export async function init_app() {
  await init_config();
  await init_data();
}
