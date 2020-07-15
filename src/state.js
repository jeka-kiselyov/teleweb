import Config from './config.js'
import { ErrorResponse } from './Services'

const defaultDCs = {
    test: [
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 1,
                "ip_address": "149.154.175.10",
                "port": 80
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 2,
                "ip_address": "149.154.167.40",
                "port": 80
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 2,
                "ip_address": "149.154.175.117",
                "port": 80
            },
        ],
    main: [
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 1,
                "ip_address": "149.154.175.50",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "ipv6": true
                },
                "flags": 1,
                "id": 1,
                "ip_address": "2001:0b28:f23d:f001:0000:0000:0000:000a",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 2,
                "ip_address": "149.154.167.51",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "static": true
                },
                "flags": 16,
                "id": 2,
                "ip_address": "149.154.167.51",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "ipv6": true
                },
                "flags": 1,
                "id": 2,
                "ip_address": "2001:067c:04e8:f002:0000:0000:0000:000a",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 3,
                "ip_address": "149.154.175.100",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "ipv6": true
                },
                "flags": 1,
                "id": 3,
                "ip_address": "2001:0b28:f23d:f003:0000:0000:0000:000a",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 4,
                "ip_address": "149.154.167.92",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "ipv6": true
                },
                "flags": 1,
                "id": 4,
                "ip_address": "2001:067c:04e8:f004:0000:0000:0000:000a",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "media_only": true
                },
                "flags": 2,
                "id": 4,
                "ip_address": "149.154.165.120",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {},
                "flags": 0,
                "id": 5,
                "ip_address": "91.108.56.170",
                "port": 443
            },
            {
                "_": "dcOption",
                "pFlags": {
                    "ipv6": true
                },
                "flags": 1,
                "id": 5,
                "ip_address": "2001:0b28:f23f:f005:0000:0000:0000:000a",
                "port": 443
            }
        ],
};

const defaultState = {
    current_dc_id: 2,
    prev_dc_id: undefined,
    dc_options: Config.Modes.test ? defaultDCs.test : defaultDCs.main,
    networkers: [
    ]
}

let state = { ...defaultState }

let dump = undefined
let load = undefined

export const flushState = () => {
    state = { ...defaultState };
    setState();
}

export const initState = (options, dumpState, loadState) => new Promise((resolve, reject) => {
    console.error(options);

    // console.warn('Set config hash', 1);
    let persistState = options.persistState || false;
    // console.warn('Set config hash', 1);
    // let test = options.test || false;
    // let ssl = options.ssl || false;

    // console.warn('Set config hash', 1);
    Config.App.id = options.appId;
    Config.App.hash = options.appHash;

    // console.warn('Set config hash', configHash);
    Config.Modes.websockets = options.websockets || false;
    Config.Modes.test = options.test || false;
    Config.Modes.ssl = options.ssl || false;

    let configHash = ''+Config.App.id+'_'+Config.App.hash+'_'+Config.Modes.websockets+Config.Modes.test+Config.Modes.ssl;
    // console.warn('Set config hash', configHash);

    defaultState.configHash = configHash;
    defaultState.dc_options = Config.Modes.test ? defaultDCs.test : defaultDCs.main;
    defaultState.isTest = Config.Modes.test;

    dump = dumpState
    load = loadState
    // console.warn('Set config hash', configHash);

    if (!persistState) {
        flushState();
        resolve();

        return;
    }

    //LogService.logInfo(`[state] init`)

    if (load) {
        load()
            .then(stateContents => {
                try {
                    state = JSON.parse(stateContents);

                    if (state.configHash !== defaultState.configHash) {
                        throw new Error('Different config hash in stored state. Need to flush it...');
                    }
                    console.log(state);
                } catch(e) {
                    console.error(e);
                    flushState();
                }
                resolve()
            })
            .catch(err => {
                //LogService.logError(`[state] ${new ErrorResponse(err)}`)

                reject()
            })
        return
    }

    resolve()
})

export const getState = () => {
    return state
}
export const setState = (newState) => {
    return new Promise((res, rej)=>{
        state = { ...state, ...newState }
        if (dump) {
            dump(JSON.stringify(state))
                .then(()=>{
                    res();
                })
                .catch(()=>{
                    res();
                });
        } else {
            res();
        }
    });
}
