namespace DBC {
  namespace Runtime {
    type Status = 'starting' | 'running' | 'stopped' | 'restarting' | 'error';

    interface ProcessInfo {
      startedAt?: number;
      status: Status;
      updatedAt: number;
    }

    type OnRuntimeInfo = (info: ProcessInfo) => void;
  }
}
