const setup = require('./pupp/setup');
const puppeteer = require('puppeteer');

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  try {
    const result = await exports.run(browser);
    callback(null, result);
  } catch (e) {
    callback(e);
  }
};

exports.run = async (browser) => {
    const page = await browser.newPage();

    await page.setViewport({width: 1280, height: 1024});
    await page.goto('https://www.strava.com/');
    await page.click('a.btn-login');
    await page.waitForSelector('form');

    // Login
    await page.type('input#email', process.env.STRAVA_EMAIL);
    await page.type('input#password', process.env.STRAVA_PASSWORD);
    await page.click('button#login-button');
    await page.waitForNavigation({waitUntil: 'networkidle2'});
    await page.waitFor(1000);

    // Go To Club Activity
    await page.goto('https://www.strava.com/clubs/28521/recent_activity');
    await page.waitFor(1000);

    // Give Kudos to recent activity on page
    await page.$$eval('button[title="Give Kudos"]', (buttons) => {
        buttons.map((button) => {
            button.click();
            await page.waitFor(200);
            console.log('Kudos Given!!');
        });
    });

    await page.close();
    return 'done';
};
