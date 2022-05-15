import { execSync } from 'node:child_process';

execSync('rm -rf packages/notes/storybook-static');
execSync('rm -rf packages/svelte/storybook-static');
