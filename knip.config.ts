import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: [
    '.prettierrc.js',
    'eslint.config.mjs',
    'eslint.local.config.mjs',
    'prettier.local.config.js',
    '.github/scripts/browserAcceptance.mjs',
    '.github/scripts/lighthouseAcceptance.mjs',
  ],
});
