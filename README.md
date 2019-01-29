# strava-kudos-lambda

A serverless framework lambda function to give Strava Kudos to Recent Activity in a given club page, scheduled to run every 4 hours. This uses puppeteer. Credit to sambaiz/puppeteer-lambda-starter-kit & needcaffeine/strava-kudos-bot

### ENV VARS to set:  
STRAVA_EMAIL   
STRAVA_PASSWORD   
STRAVA_CLUB_URL   
DEBUG  
SLOWMO_MS   

```
$ npm run package

$ serverless deploy
```
