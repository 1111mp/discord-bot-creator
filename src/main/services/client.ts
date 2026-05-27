import { ipcRenderer } from 'electron';

export const createIpcProxy = () => {
  return new Proxy({} as IMainIpcServices, {
    get(_, moduleName: string) {
      return new Proxy(
        {},
        {
          get(_, methodName: string) {
            return (...args: ReadonlyArray<unknown>) => {
              const channel = `${moduleName}:${methodName}`;
              return ipcRenderer.invoke(channel, ...args);
            };
          },
        },
      );
    },
  });
};
