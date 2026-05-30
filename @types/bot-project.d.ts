namespace DBC {
  namespace BotProject {
    interface Setting {
      id?: string; // DBC.IProject.id
      depsInstalled?: boolean; // default `false`

      prefix: string; // default '!'
      token: string;
      clientId: string;
    }

    interface ModMeta {
      /**
       * DBC bot/program version.
       */
      version: string;
      /**
       * Action/Event/Extension version.
       */
      modVersion: string;
      /**
       * Author of the mod.
       */
      author: string;
      /**
       * Author website url.
       */
      authorUrl: string;
      /**
       * Url to download/update the mod.
       */
      downloadUrl: string;
    }
  }
}
