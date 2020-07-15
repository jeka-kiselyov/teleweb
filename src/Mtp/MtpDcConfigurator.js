import Config from '../config.js'
import { getState } from '../state.js'

export function chooseServer(dcId) {
  dcId = dcId % 1000; // mod by 1000

  let dcConfig = getState().dc_options

  // Excluding ipV6
  dcConfig = dcConfig.filter(dc => !dc.pFlags.ipv6)

  const dcOption = dcConfig.find(dc => dc.id == dcId)

  if (!dcOption) {
    throw new Error(`Could not find dc with id = ${dcId}`)
  }

  // console.log('Config.Modes', Config.Modes);

  let domain = '';
  if (Config.Modes.ssl) {
  	let dcs = ['pluto','venus','aurora','vesta','flora'];
    if (Config.Modes.websockets) {
      domain = 'wss://'+dcs[dcId-1]+'-1.web.telegram.org:443';
    } else {
      domain = 'https://'+dcs[dcId-1]+'-1.web.telegram.org:443';
    }
  } else {
    if (Config.Modes.websockets) {
      domain = 'ws://'+dcOption.ip_address+':'+dcOption.port;
    } else {
      domain = 'http://'+dcOption.ip_address+':'+dcOption.port;
    }
  }

  let path = 'apiw';
  if (Config.Modes.websockets) {
    path+= 's';
  }
  if (Config.Modes.test) {
    path+='_test';
  }

  path+='1'; /// @todo: need this? Is this documented?

  return domain+'/'+path;
}
