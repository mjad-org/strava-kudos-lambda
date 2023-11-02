const kudos = require('../kudos');
const config = require('./config');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: process.env.SLOWMO_MS,
    dumpio: !!config.DEBUG,
  });
  await kudos.run(browser)
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  await browser.close();
})();
