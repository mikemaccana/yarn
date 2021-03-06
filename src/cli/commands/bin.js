/* @flow */

import type {Reporter} from '../../reporters/index.js';
import type Config from '../../config.js';
import RegistryYarn from '../../resolvers/registries/yarn-resolver.js';

const fs = require('fs');
const path = require('path');

export function hasWrapper(commander: Object): boolean {
  return false;
}

export function setFlags(commander: Object) {
  commander.description('Displays the location of the yarn bin folder.');
}

export function run(config: Config, reporter: Reporter, flags: Object, args: Array<string>): Promise<void> {
  const binFolder = path.join(config.cwd, config.registries[RegistryYarn.registry].folder, '.bin');
  if (args.length === 0) {
    reporter.log(binFolder, {force: true});
  } else {
    const binName = args[0];
    const finalPath = path.normalize(`${binFolder}/${binName}`);
    if (fs.existsSync(finalPath)) {
      reporter.log(finalPath, {force: true});
    } else {
      reporter.error(reporter.lang('packageBinaryNotFound', binName));
    }
  }
  return Promise.resolve();
}
