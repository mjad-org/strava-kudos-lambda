const path = require('path');

const launchOptionForLambda = [
  // error when launch(); No usable sandbox! Update your kernel
  '--no-sandbox',
  // error when launch(); Failed to load libosmesa.so
  '--disable-gpu',
  // freeze when newPage()
  '--single-process',
  '--headless',
];

const localChromePath = path.join('headless_shell.tar.gz');
const setupChromePath = path.join(path.sep, 'tmp');
const executablePath = path.join(
    setupChromePath,
    'headless_shell',
);

const DEBUG = process.env.DEBUG;

module.exports = {
  launchOptionForLambda,
  localChromePath,
  setupChromePath,
  executablePath,
  DEBUG,
};
