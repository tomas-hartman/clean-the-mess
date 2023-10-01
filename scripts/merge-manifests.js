const jq = require('node-jq');
const path = require('path');
const { argv } = require('yargs');

if (!argv.f) {
  throw new Error('Input manifest must be specified with -f flag');
}

const sourceManifest = path.resolve(__dirname, '../packages/common/src/manifest.common.json');
const browserManifest = path.resolve(process.cwd(), argv.f);

jq.run('.[0] * .[1]', [sourceManifest, browserManifest], { slurp: true }).then(console.log);
