import { dbcConfigPath } from '../lib/dirs';
import { read_yaml, save_yaml } from '../lib/helper';

export const DEFAULT_DBC_CONFIG = {
  locale: 'en',
};

class DBCConfig {
  private data: DBC.Data;

  constructor() {
    this.data = DEFAULT_DBC_CONFIG;
  }

  async load() {
    try {
      const dbcPath = dbcConfigPath();
      this.data = await read_yaml<DBC.Data>(dbcPath);
    } catch {
      // Handle error, maybe log it or set a default value
    }
  }

  private async save() {
    await save_yaml(
      dbcConfigPath(),
      this.data,
      '# Discord Bot Creator Config File',
    );
  }
}

export const dbcConfig = new DBCConfig();
