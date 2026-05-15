import * as migration_20260515_040342 from './20260515_040342';

export const migrations = [
  {
    up: migration_20260515_040342.up,
    down: migration_20260515_040342.down,
    name: '20260515_040342'
  },
];
