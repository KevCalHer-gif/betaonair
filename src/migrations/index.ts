import * as migration_20260515_040342 from './20260515_040342';
import * as migration_20260530_041846 from './20260530_041846';

export const migrations = [
  {
    up: migration_20260515_040342.up,
    down: migration_20260515_040342.down,
    name: '20260515_040342',
  },
  {
    up: migration_20260530_041846.up,
    down: migration_20260530_041846.down,
    name: '20260530_041846'
  },
];
