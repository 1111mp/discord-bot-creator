import { ensureDir, pathExists } from 'fs-extra';

import { DEFAULT_DBC_CONFIG } from './data/dbc';
import { DEFAULT_PROJECTS_DATA } from './data/project';
import { appHomeDir, dbcConfigPath, projectsPath } from './lib/dirs';
import { save_yaml } from './lib/helper';

export async function init_config() {
  try {
    const homeDir = appHomeDir();
    await ensureDir(homeDir);

    const dbcPath = dbcConfigPath();
    if (!(await pathExists(dbcPath))) {
      await save_yaml(
        dbcPath,
        DEFAULT_DBC_CONFIG,
        '# Discord Bot Creator Config File',
      );
    }

    const proPath = projectsPath();
    if (!(await pathExists(proPath))) {
      await save_yaml(
        proPath,
        DEFAULT_PROJECTS_DATA,
        '# Discord Bot Creator Projects Config File',
      );
    }
  } catch {
    // log
  }
}
