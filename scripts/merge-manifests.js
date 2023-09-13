const jq = require('node-jq');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const sourceManifest = path.resolve(__dirname, '../packages/common/src/manifest.common.json');
const browserManifest = path.resolve(process.cwd(), argv.f);

jq.run('.[0] * .[1]', [sourceManifest, browserManifest], { slurp: true }).then(console.log);
