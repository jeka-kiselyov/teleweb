# TeleWeb - Telegram API implementation for JS in the browser

Based on original [TeleJS library(thanks RD17)](https://github.com/RD17/TeleJS) with few changes:

 - Switched to [websockets](https://core.telegram.org/mtproto/transports#websocket)
 - Switched to TG API layer 112
 - Implemented methods for [SRP two-factor authentication](https://core.telegram.org/api/srp)
 - Moved config out of the library
 - Parallel connections to same datacenters
 - Handling TG API [updates](https://core.telegram.org/api/updates)
 - Few changes in methods/dependencies to optimize functionality for webapps

## Installing

`npm install teleweb --save`

## Code Usage

```
const telegram = require('teleweb');

const config = {
  initialState: null, // initial state
  test: false,    // use test tg net
  ssl: true,      // ssl, set to true
  websockets: true, // use websockets. Set it to true, ip-based is slow and broken (in this lib)
  persistState: true, // persist state between sessions
  appId: 'xxxxx',   // https://core.telegram.org/api/obtaining_api_id
  appHash: 'xxxxx',
  defaultDC: 2,   // https://core.telegram.org/api/datacenter
  keepNotDefaultNetworkers: false,  // keep sessions for non-default data centers
};

let signedInUser = await telegram.init(config, saveState, restoreState, 'debug');
// returns signed in user (if she is) on initialization
log('User Signed In: ');
log(JSON.stringify(signedInUser));

// initial dc (useful for geolocation)
log('Nearest DC: ');
log(JSON.stringify(telegram.getNearestDc()));

log('auth.sendCode');
// query any telegram API methods
// https://core.telegram.org/methods
// https://core.telegram.org/api/auth
let resp = await telegram.mtpInvokeApi('auth.sendCode', {phone_number: '+380505555555', settings: {"_":"codeSettings"}});
log(JSON.stringify(resp));

log('different DC');
resp = await telegram.mtpInvokeApi('upload.getFile', { }, {dcId: 5});
log(JSON.stringify(resp));

log('Media DCs');
resp = await telegram.mtpInvokeApi('upload.getFile', { }, {dcId: 1005}); // all same to DC-5, mod by 1000
resp = await telegram.mtpInvokeApi('upload.getFile', { }, {dcId: 2005}); // use ( 1000*n + dcId)
resp = await telegram.mtpInvokeApi('upload.getFile', { }, {dcId: 3005}); // for parallel connections

log('auth.logOut');
resp = await telegram.mtpInvokeApi('auth.logOut');
log(JSON.stringify(resp));

log('MD5');
log(telegram.MD5('test'));

log('SRPGenerator');
resp = await telegram.mtpInvokeApi('account.getPassword');

const srpGenerator = new telegram.SRPGenerator(resp.data);
const srp = await srpGenerator.getInputCheckPasswordSRP(password);

const authResp = await telegram.mtpInvokeApi('auth.checkPassword', { password: srp });

log('Subscribe to API updates');
telegram.setUpdatesCallback((updateObject)=>{
    console.log(updateObject);
  });
```

## License

MIT