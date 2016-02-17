var args = require('minimist')(process.argv.slice(2));
var VERSION = args.version || require('../package.json').version;

module.exports = {
  banner:
  '/*!\n' +
  ' * Test Application\n' +
  ' * v' + VERSION + '\n' +
  ' */\n',
  jsBaseFiles: [
    'src/core/**/*.js'
  ],
  jsFiles: [
    'src/**/*.js',
    '!src/**/*.spec.js'
  ],
  scssFiles: [
    'src/style/**/*.scss',
  ],
  htmlFiles: [
    'web/**/*.html',
  ],
  paths: 'src/{modules}/**',
  outputDir: '../../client/merchants/dist',
};