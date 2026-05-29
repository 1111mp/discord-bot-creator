import { spawn } from 'child_process';

import { getNpmPath, getParsedEnv } from './node-path';

export async function installDeps(path: string) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn(getNpmPath(), ['run', 'install'], {
      cwd: path,
      shell: true,
      env: getParsedEnv(),
    });

    proc.stdout.on('data', (d) => {
      console.log(d.toString());
    });

    proc.stderr.on('data', (d) => {
      console.error(d.toString());
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed`));
      }
    });
  });
}
