const setup = require('./pupp/setup');

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
    await page.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});
    await page.waitForSelector('form');
    await page.type('input#email', process.env.STRAVA_EMAIL);
    await page.type('input#password', process.env.STRAVA_PASSWORD);
    await page.waitFor(200);
    await page.evaluate(()=>document
      .querySelector('button#login-button')
      .click()
    );
    await page.waitForNavigation();
    await page.goto(process.env.STRAVA_CLUB_URL, {waitUntil: 'networkidle2'});
    await page.waitFor(2000);
    console.log('Club URL loaded');

    // Give Kudos to recent club activity on page
    await page.$$eval('button[title="Give Kudos"]', (buttons) => {
        buttons.map(async (button) => {
          console.log("kudos given");
          button.click();
        });
    });

    await page.close();
    return 'done';
};
