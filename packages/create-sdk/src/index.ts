import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import {
  cancel,
  intro,
  isCancel,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import pc from 'picocolors';

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(__dirname);

export const defaultName = 'micro-app';

export const templateOptions = [
  { value: 'main-react18', label: 'MainApp（React18）' },
  { value: 'main-react19', label: 'MainApp（React19）' },
  { value: 'sub-react', label: 'SubApp (React)' },
  {
    value: 'sub-react-postcss',
    label: 'SubApp (React + PostCSS)',
    hint: 'Qinkun style Isolation',
  },
] as const;

type TemplateOption = (typeof templateOptions)[number]['value'];

export interface Options {
  template?: TemplateOption;
  name?: string;
}

export type ResolvedOptions = Required<Options>;

/**
 * Create a project.
 * @param name The project name
 * @param options The user options
 */
export async function create(
  name: string | undefined,
  options: Options,
): Promise<void> {
  console.log();
  intro(pc.green(`Create a micro frontend project...`));

  const { name: packageName, template: templateName } = await resolveOptions({
    ...options,
    name,
  });

  const s = spinner();
  s.start('Cloning the template...');

  await copyTemplate(templateName, packageName);

  await writePackageJson(packageName);

  await writeIndexHtml(packageName);

  await renameGitignore(packageName);

  s.stop(`Successfully cloned template！🎉`);

  outro(pc.green(`Done！🤖`));

  console.log(
    `${pc.blue(`The subapp's react and react-dom dependencies should stay consistent with the mainapp！`)} 👀`,
  );
}

/**
 * Resolve the user options and configs
 * @param options The user options
 * @returns The resolved options
 */
export async function resolveOptions(
  options: Options,
): Promise<ResolvedOptions> {
  let name: Options['name'] | symbol = options.name;

  if (!name) {
    name = await text({
      message: 'What is the name of your package?',
      placeholder: defaultName,
      defaultValue: defaultName,
      validate(value) {
        if (
          value &&
          !/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
            String(value),
          )
        ) {
          return 'Invalid project name';
        }
      },
    });
    if (isCancel(name)) {
      cancel('Operation cancelled.');
      process.exit(1);
    }
  }

  let template: Options['template'] | symbol = options.template;
  if (template) {
    const templateOptionsValues = templateOptions.map((option) => option.value);
    if (!templateOptionsValues.includes(template)) {
      throw new Error(
        `Invalid template "${template}". Available templates: ${templateOptionsValues.join(', ')}`,
      );
    }
  } else {
    template = await select({
      message: 'Which template do you want to use?',
      options: [...templateOptions],
      initialValue: 'main-react18',
    });

    if (isCancel(template)) {
      cancel('Operation cancelled.');
      process.exit(1);
    }
  }

  return { name, template } as ResolvedOptions;
}

/**
 * Copy the template
 * @param template The template name
 * @param packageName The package name
 */
export async function copyTemplate(
  template: string,
  packageName: string,
): Promise<void> {
  const sourcePath = path.join(root, 'templates', template);
  const targetPath = path.join(cwd, packageName);

  if (fs.existsSync(targetPath)) {
    cancel(`The folder ${packageName} already exists.`);
    process.exit(1);
  }

  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

/**
 * Write the package.json file
 * @param packageName The package name
 */
export async function writePackageJson(packageName: string): Promise<void> {
  const pkgPath = path.join(cwd, packageName, 'package.json');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.name = packageName;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

/**
 * Write the index.html file
 * @param packageName The package name
 */
export async function writeIndexHtml(packageName: string): Promise<void> {
  const htmlPath = path.join(cwd, packageName, 'index.html');

  const index = fs.readFileSync(htmlPath, 'utf-8');

  const newIndex = index.replace(
    /<title>.*?<\/title>/,
    `<title>${packageName}</title>`,
  );

  fs.writeFileSync(htmlPath, newIndex);
}

/**
 * Rename the _gitignore file to .gitignore
 * @param packageName The package name
 */
export async function renameGitignore(packageName: string): Promise<void> {
  const gitignorePath = path.join(cwd, packageName, '_gitignore');
  const newGitignorePath = path.join(cwd, packageName, '.gitignore');

  if (fs.existsSync(gitignorePath)) {
    fs.renameSync(gitignorePath, newGitignorePath);
  }
}
