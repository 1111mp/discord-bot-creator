import { spawn, type ChildProcess } from 'node:child_process';
import { join } from 'node:path';
import { libNodePath } from '../lib/dirs';
import { getNodePath } from './node-path';

interface RuntimeProcess {
  process: ChildProcess;
  startedAt: number;
  status: 'running' | 'stopped';
}

export class BotManager {
  private runtimes = new Map<string, RuntimeProcess>();
  private libNode: string = libNodePath();

  constructor() {}

  start(project: DBC.IProject) {
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

    this.runtimes.set(project.id, {
      process: proc,
      startedAt: Date.now(),
      status: 'running',
    });

    proc.stdout.on('data', (data) => {
      const message = data.toString();

      console.log(`[${project.name}]`, message);
    });

    proc.stderr.on('data', (data) => {
      const message = data.toString();

      console.error(`[${project.name}]`, message);
    });

    proc.on('close', (code) => {
      const runtime = this.runtimes.get(project.id);

      if (runtime) {
        runtime.status = 'stopped';
      }

      console.log('code', code);
    });
  }

  stop(projectId: string) {
    const runtime = this.runtimes.get(projectId);

    if (!runtime) {
      return;
    }

    runtime.process.kill();
    runtime.status = 'stopped';
  }

  restart(project: DBC.IProject) {
    this.stop(project.id);

    setTimeout(() => {
      this.start(project);
    }, 1000);
  }
}
