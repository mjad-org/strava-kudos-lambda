const kudos = require('../kudos');
const config = require('./config');
const chromium = require('chrome-aws-lambda');

(async () => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,

    slowMo: process.env.SLOWMO_MS,
    dumpio: !!config.DEBUG,
  });
  await kudos.run(browser)
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  await browser.close();
})();
