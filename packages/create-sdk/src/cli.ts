import process from 'node:process';

import { log } from '@clack/prompts';
import { cac } from 'cac';
import pc from 'picocolors';

import pkg from '../package.json';
import { create, defaultName, Options, templateOptions } from './index.ts';

const cli = cac(pkg.name).version(pkg.version).help();

cli
  .command('[name]', 'Create a micro frontend project')
  .option(
    '-t, --template <template>',
    `Available templates: ${templateOptions.map((option) => option.value).join(', ')}`,
  )
  .example(pc.green('  npx create-sdk'))
  .example(pc.green(`  npx create-sdk ${defaultName}`))
  .example(pc.green(`  npx create-sdk -t ${templateOptions[0].value}`))
  .example(
    pc.green(`  npx create-sdk -t ${templateOptions[0].value} ${defaultName}`),
  )
  .action((name: string | undefined, options: Options) =>
    create(name, options),
  );

async function runCli() {
  cli.parse(process.argv, { run: false });

  try {
    await cli.runMatchedCommand();
  } catch (error) {
    log.error(String(error));
    process.exit(1);
  }
}

runCli();
