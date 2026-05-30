import { copy, readJson as fsReadJson, pathExists, writeJson } from 'fs-extra';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';

export async function readYaml<T>(path: string): Promise<T> {
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

export async function saveYaml<T>(
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

export async function readJson<T>(path: string): Promise<T> {
  if (!(await pathExists(path))) {
    throw new Error(`file not found "${path}"`);
  }

  try {
    const json = await fsReadJson(path, 'utf-8');
    return json as T;
  } catch {
    throw new Error(`failed to read the file with json format "${path}"`);
  }
}

export async function saveJson<T>(path: string, data: T): Promise<void> {
  try {
    await writeJson(path, data, { encoding: 'utf-8', spaces: 2 });
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
  const pkg = await readJson<{ name: string; description?: string }>(pkgPath);
  pkg.name = name;
  if (description) {
    pkg.description = description;
  }
  await writeJson(pkgPath, pkg, { encoding: 'utf-8', spaces: 2 });
}
