import { accessSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';
import globby from 'globby';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicContentPath = path.resolve(__dirname, '../content/public/');
const generateStoriesPath = path.resolve(__dirname, '../packages/notes/generated-stories');

const publicFiles = (await globby([`${publicContentPath}/**/*`])).map(x => x.replace(`${publicContentPath}/`, ''));

execSync(`rm -rf ${generateStoriesPath}`);

try {
  console.log(chalk.cyan(generateStoriesPath));
  accessSync(generateStoriesPath);
} catch (err) {
  mkdirSync(generateStoriesPath);
}

publicFiles.forEach((file, index) => {
  const data = `import { Meta } from '@storybook/addon-docs';
import Readme from '../../../content/public/${file}';

<Meta title="${file}" />

<Readme />
`;

  writeFileSync(`${generateStoriesPath}/Content-${index}.stories.mdx`, data, { encoding: 'utf-8' });
});
