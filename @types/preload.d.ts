interface Window {
  electron: {
    ipcService: IMainIpcServices & {
      botProject: {
        onRuntimeInfo: (fn: OnRuntimeInfo) => () => void;
      };
    };
  };
}
