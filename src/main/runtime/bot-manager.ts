import { type BrowserWindow } from 'electron';
import { spawn, type ChildProcess } from 'node:child_process';
import { join } from 'node:path';

import { libNodePath } from '../lib/dirs';
import { getNodePath } from './node-path';

interface RuntimeProcess {
  process: ChildProcess;
  startedAt: number;
  status: DBC.Runtime.Status;
}

class BotManager {
  private runtimes = new Map<string, RuntimeProcess>();
  private libNode: string = libNodePath();

  private readonly windows = new Set<BrowserWindow>();

  constructor() {}

  getRuntime(projectId: string): DBC.Runtime.ProcessInfo {
    const runtime = this.runtimes.get(projectId);
    if (!runtime)
      return {
        status: 'stopped',
        updatedAt: Date.now(),
      };

    return {
      startedAt: runtime?.startedAt,
      status: runtime?.status,
      updatedAt: Date.now(),
    };
  }

  async start(project: DBC.IProject) {
    const existing = this.runtimes.get(project.id);

    if (existing?.status === 'running') {
      return;
    }

    const entry = join(project.path, 'index.js'),
      env = {
        ...process.env,
        PATH:
          process.platform === 'win32'
            ? `${this.libNode};${process.env.PATH}`
            : `${this.libNode}:${process.env.PATH}`,
      };

    const proc = spawn(getNodePath(), [entry], {
      cwd: project.path,
      env,
    });

    console.log('process.pid', proc.pid);

    this.runtimes.set(project.id, {
      process: proc,
      startedAt: Date.now(),
      status: 'starting',
    });

    proc.stdout.on('data', async (data) => {
      const message = data.toString();
      console.log(`[${project.name}]`, message);

      const runtime = this.runtimes.get(project.id);
      if (
        runtime &&
        runtime.status === 'starting' &&
        message.includes('Bot started')
      ) {
        await this.updateStatus(project.id, 'running');
      }
    });

    proc.stderr.on('data', async (data) => {
      const message = data.toString();
      console.error(`[${project.name}]`, message);

      const runtime = this.runtimes.get(project.id);
      if (runtime) {
        await this.updateStatus(project.id, 'error');
      }
    });

    proc.on('close', async (code) => {
      const runtime = this.runtimes.get(project.id);
      console.log('code', code);

      if (runtime && code === 0) {
        await this.updateStatus(project.id, 'stopped');
      }
    });
  }

  async stop(projectId: string) {
    const runtime = this.runtimes.get(projectId);

    if (!runtime) {
      return;
    }

    // TODO graceful shutdown
    runtime.process.kill();
    await this.updateStatus(projectId, 'stopped');
  }

  async restart(project: DBC.IProject) {
    const runtime = this.runtimes.get(project.id);
    if (!runtime) {
      return;
    }

    // just change status, don't notify
    runtime.status = 'restarting';

    runtime.process.kill();

    setTimeout(() => {
      this.start(project);
    }, 1000);
  }

  addWindow(window: BrowserWindow) {
    if (this.windows.has(window)) {
      return;
    }

    this.windows.add(window);

    window.once('closed', () => {
      this.windows.delete(window);
    });
  }

  private async updateStatus(projectId: string, status: DBC.Runtime.Status) {
    const runtime = this.runtimes.get(projectId);
    if (!runtime) {
      return;
    }

    runtime.status = status;

    for (const window of this.windows) {
      window.webContents.send('botProject:onRuntimeInfo', {
        startedAt: runtime.startedAt,
        status: runtime.status,
        updatedAt: Date.now(),
      });
    }
  }
}

export const botManager = new BotManager();
