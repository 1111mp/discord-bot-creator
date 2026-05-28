import { copy, pathExists, readJson, writeJson } from 'fs-extra';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';

export async function read_yaml<T>(path: string): Promise<T> {
  if (!(await pathExists(path))) {
    throw new Error(`file not found "${path}"`);
  }

  try {
    const yaml_content = await readFile(path, 'utf-8');
    return parse(yaml_content) as T;
  } catch {
    throw new Error(`failed to read the file with yaml format "${path}"`);
  }
}

export async function save_yaml<T>(
  path: string,
  data: T,
  prefix?: string,
): Promise<void> {
  try {
    const data_content = stringify(data);
    const yaml_content = prefix ? `${prefix}\n\n${data_content}` : data_content;

    await writeFile(path, yaml_content, 'utf-8');
  } catch {
    throw new Error(`failed to save file "${path}"`);
  }
}

interface CreateProjectOptions {
  templatePath: string;
  path: string;
  name: string;
  description?: string;
}

export async function createBotProject({
  templatePath,
  path,
  name,
  description,
}: CreateProjectOptions): Promise<void> {
  await copy(templatePath, path, {
    overwrite: true,
  });

  const pkgPath = join(path, 'package.json');
  const pkg = await readJson(pkgPath, 'utf-8');
  pkg.name = name;
  if (description) {
    pkg.description = description;
  }
  await writeJson(pkgPath, pkg, { encoding: 'utf-8', spaces: 2 });
}
