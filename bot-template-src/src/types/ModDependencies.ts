import type { DependencyName } from './DependencyName.js';
import type { DependencyVersion } from './DependencyVersion.js';

export type ModDependencies = Record<DependencyName, DependencyVersion>;
