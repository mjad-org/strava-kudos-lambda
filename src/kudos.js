const setup = require('./pupp/setup');

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let params = {
    CiphertextBlob: Buffer.from(process.env.STRAVA_PASSWORD, 'base64')
  }

  let STRAVA_PASSWORD = null;
  try {
    const decrypted = await kms.decrypt(params).promise();
    STRAVA_PASSWORD = decrypted.Plaintext.toString('utf-8');
  } catch (exception) {
    console.error(exception)
  }

  const browser = await setup.getBrowser();
  try {
    const result = await exports.run(browser, STRAVA_PASSWORD);
    return result;
  } catch (e) {
    return e;
  }
};

exports.run = async (browser, STRAVA_PASSWORD) => {
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 1024});
    await page.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});
    await page.waitForSelector('form');
    await page.type('input#email', process.env.STRAVA_EMAIL);
    await page.type('input#password', STRAVA_PASSWORD);
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
