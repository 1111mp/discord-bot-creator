import { join } from 'node:path';

import { libNodePath } from '../lib/dirs';

export function getNodePath() {
  return join(
    libNodePath(),
    ...(process.platform === 'win32' ? ['node.exe'] : ['bin', 'node']),
  );
}

export function getNpmPath() {
  return join(
    libNodePath(),
    ...(process.platform === 'win32' ? ['npm.cmd'] : ['bin', 'npm']),
  );
}

export function getParsedEnv(): NodeJS.ProcessEnv {
  const libNode = libNodePath();
  return {
    ...process.env,
    PATH:
      process.platform === 'win32'
        ? `${libNode};${process.env.PATH}`
        : `${libNode}:${process.env.PATH}`,
  };
}
