import * as migration_20260515_040342 from './20260515_040342';
import * as migration_20260530_041846 from './20260530_041846';
import * as migration_20260609_014204 from './20260609_014204';
import * as migration_20261030_032853 from './20261030_032853';

export const migrations = [
  {
    up: migration_20260515_040342.up,
    down: migration_20260515_040342.down,
    name: '20260515_040342',
  },
  {
    up: migration_20260530_041846.up,
    down: migration_20260530_041846.down,
    name: '20260530_041846',
  },
  {
    up: migration_20260609_014204.up,
    down: migration_20260609_014204.down,
    name: '20260609_014204',
  },
  {
    up: migration_20261030_032853.up,
    down: migration_20261030_032853.down,
    name: '20261030_032853'
  },
];
