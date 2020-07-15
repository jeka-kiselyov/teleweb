import * as MtpAuthorizer from './MtpAuthorizer'
import * as MtpNetworker from './MtpNetworker'
import { getState, setState, initState, flushState } from '../state'
import { dT, tsNow, inflate, md5 } from '../Utils'
import { ErrorResponse } from '../Services'
import { SRP } from '../Utils/SRP'
import { name } from '../../package.json'
import { networkRequest, flushSockets } from '../network'

let isInitialized = false

export const MtpAuth = MtpAuthorizer;
// console.error(SRP);
export const SRPGenerator = SRP;
export const MD5 = md5;
export const setUpdatesCallback = MtpNetworker.setUpdatesProcessor;

export const inflateObj = inflate; /// we need gzipUncompress for playing tgs, so lets export it from here

let nearestDCData = null;
export const getNearestDc = ()=>{
    return nearestDCData;
};

let appId = null;
let appHash = null;

export const init = (options, dumpState, loadState, loggingLevel = 'verbose') => new Promise((resolve, reject) => {
    // LogService.init(name, loggingLevel)
    let gNetworker = null;

    appId = options.appId;
    appHash = options.appHash;

    initState(options, dumpState, loadState)
        .then(() => {
            isInitialized = true;

            let state = getState();
            if (state && state.default_dc_id) {
                options.defaultDC = state.default_dc_id;
            }

            if (!options.keepNotDefaultNetworkers) {
                let updatedNetworkers = [];
                for (let networker of state.networkers) {
                    if (networker.id == options.defaultDC) {
                        updatedNetworkers.push(networker);
                    }
                }

                state.networkers = updatedNetworkers;
            }

            state.current_dc_id = options.defaultDC;
            state.prev_dc_id = undefined;
            state.default_dc_id = options.defaultDC;

            setState(state);

            return mtpGetNetworker(options.defaultDC);
        })
        .then((networker)=> {
            // remove all other networkers from state
            gNetworker = networker;
            return networker.wrapApiCall('help.getNearestDc', {}, { dcId: options.defaultDC, noErrorBox: true });

            // isInitialized = true;

            // let initTimeout = setTimeout(()=>{
            //     console.error('no response for init full user');
            //     resolve(null);
            // }, 2000); // if no full user data in 2 sec - log out.

            // mtpInvokeApi('users.getFullUser', {id: { "_": "inputUserSelf" }})
            //     .then((data)=>{
            //         console.error('full user', data);
            //         resolve(data);
            //         clearTimeout(initTimeout);
            //     })
            //     .catch((data)=>{
            //         console.error('no full user', data);
            //         resolve(null);
            //         clearTimeout(initTimeout);
            //     });

        })
        .then((nearestDC)=>{
            // console.warn('nearestDC', nearestDC);
            nearestDCData = nearestDC;

            return mtpInvokeApi('users.getFullUser', {id: { "_": "inputUserSelf" }});
        })
        .then((selfUser)=>{
            console.warn('Self user', selfUser);

            // if (selfUser) {
            //     gNetworker.signedIn = true;
            // }

            resolve(selfUser);
        })
        .catch((e) => {
            console.error(e);

            // default state set
            isInitialized = true;
            resolve(null);
        });
})

let networkers = {};
let networkersPromises = {};
let networkersPromisesResolvers = {};
let networkersPromisesRejecters = {};

export const logOut = () => {
    isInitialized = false;
    networkers = {};
    networkersPromises = {};
    MtpAuthorizer.flushCachedNetworkers();
    flushState();
}

export const mtpGetNetworker = (dcId, options = {}) => new Promise((resolve, reject) => {
    dcId = dcId || getState().current_dc_id;

    if (!isInitialized) {
        reject(new Error('Not initialized!'))
        return
    }

    if (!dcId) {
        reject(new Error('Please specify dcId'))
        return
    }

    if (networkers[dcId]) {
        resolve(networkers[dcId]);
        return;
    }

    const networkerDataFromState = getState().networkers.find(nw => nw.id == dcId)
    if (networkerDataFromState) {
        const networker = MtpNetworker.getNetworker(dcId, networkerDataFromState.auth.authKey, networkerDataFromState.auth.serverSalt, options);
        networkers[dcId] = networker;
        resolve(networker);
        // networker.wrapApiCall('users.getFullUser', {id: { "_": "inputUserSelf" }})
        //     .then((data)=>{
        //         networkers[dcId] = networker;
        //         resolve(networker);
        //     })
        //     .catch((data)=>{
        //         // remove networker from state
        //         let state = getState();
        //         let updatedNetworkers = [];
        //         for (let networker of state.networkers) {
        //             if (networker.id != dcId) {
        //                 updatedNetworkers.push(networker);
        //             }
        //         }

        //         state.networkers = updatedNetworkers;
        //         setState(state)
        //             .then(()=>{
        //                 mtpGetNetworker(dcId, options)
        //                     .then((networker)=>{
        //                         resolve(networker);
        //                     })
        //                     .catch((e)=>{
        //                         reject(e);
        //                     });
        //             });
        //     });
        return;
    }

    let wPromise = null;
    if (!networkersPromises[dcId]) {
        networkersPromises[dcId] = new Promise(function(res, rej){
            networkersPromisesResolvers[dcId] = res;
            networkersPromisesRejecters[dcId] = rej;
        });
        wPromise = Promise.resolve(null);
    } else {
        wPromise = networkersPromises[dcId];
    }

    wPromise
        .then((networker)=>{
            const originalDcId = dcId % 1000;
            if (networker) {
                resolve(networker);
            } else if (dcId > 1000 && networkers[originalDcId]) {
                // media networkers
                const networker = MtpNetworker.getNetworker(dcId, networkers[originalDcId].authKey, networkers[originalDcId].serverSalt, options);
                networkers[dcId] = networker;
                setState({ networkers: [...getState().networkers, { id: dcId, auth: {authKey: networkers[originalDcId].authKey, serverSalt: networkers[originalDcId].serverSalt } }] });
                resolve(networker);
                networkersPromisesResolvers[dcId](networker);
                // const state = getState();
                // let defaultNetworker = networkers[state.default_dc_id];
                // if (defaultNetworker && defaultNetworker.signedIn) {
                //     const networker = MtpNetworker.getNetworker(dcId, defaultNetworker.authKey, defaultNetworker.serverSalt, options);

                //     networkers[dcId] = networker;
                //     setState({ networkers: [...getState().networkers, { id: dcId, auth: {authKey: defaultNetworker.authKey, serverSalt: defaultNetworker.serverSalt } }] });
                //     resolve(networker);
                //     networkersPromisesResolvers[dcId](networker);
                // }
            } else {
                MtpAuthorizer.auth(dcId)
                    .then((auth) => {
                        const state = getState();
                        const networker = MtpNetworker.getNetworker(dcId, auth.authKey, auth.serverSalt, options);

                        let defaultNetworker = networkers[state.default_dc_id];

                        if (defaultNetworker && defaultNetworker.signedIn) {
                            // export authorization to new networker
                            if (dcId != state.default_dc_id) {
                                let dcIdToExport = dcId % 1000;


                                mtpInvokeApi('auth.exportAuthorization', { dc_id: dcIdToExport }, { dcId: state.default_dc_id, noErrorBox: true })
                                    .then((exportedAuth) => {
                                        return networker.wrapApiCall('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true })
                                    })
                                    .then(()=>{
                                        networkers[dcId] = networker;
                                        setState({ networkers: [...getState().networkers, { id: dcId, auth: auth }] });
                                        resolve(networker);
                                        networkersPromisesResolvers[dcId](networker);
                                    })
                                    .catch((e)=>{
                                        reject(e);
                                    });
                            } else {
                                /// should never be here
                                throw new Error('should never be here');
                                resolve(defaultNetworker);
                            }
                        } else {
                            // we are probably here because of PHONE_MIGRATE_
                            // flush other networker and keep this one as default
                            // flushSockets();
                            networkers = {};
                            networkers[dcId] = networker;
                            setState({ networkers: [ { id: dcId, auth: auth }], default_dc_id: dcId });
                            resolve(networker);
                            networkersPromisesResolvers[dcId](networker);
                        }
                        // if (dcId != state.default_dc_id) {
                        //     mtpInvokeApi('auth.exportAuthorization', { dc_id: dcId }, { dcId: state.default_dc_id, noErrorBox: true })
                        //         .then((exportedAuth) => {
                        //             return networker.wrapApiCall('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true })
                        //         })
                        //         .then(()=>{
                        //             networkers[dcId] = networker;
                        //             setState({ networkers: [...getState().networkers, { id: dcId, auth: auth }] });
                        //             resolve(networker);
                        //             networkersPromisesResolvers[dcId](networker);
                        //         })
                        //         .catch((e)=>{
                        //             reject(e);
                        //         });
                        // } else {
                        //     console.warn('setting networker to state', auth, dcId);
                        //     networkers[dcId] = networker;
                        //     setState({ networkers: [...getState().networkers, { id: dcId, auth: auth }] });
                        //     resolve(networker);
                        //     networkersPromisesResolvers[dcId](networker);
                        // }
                    })
                    .catch((error) => {
                        reject(error);
                        networkersPromisesRejecters[dcId](error);
                    });
            }
        })
        .catch((error) => {
            reject(error);
        });
})

// export const signUpUser = (phoneNumber, firstName, lastName, codeInputPromise) => new Promise((resolve, reject) => {
//     if (!isInitialized) {
//         reject(new Error('Not initialized!'))
//         return
//     }

//     const sendCodeCallParams = {
//         flags: 0,
//         allow_flashcall: null,
//         phone_number: phoneNumber,
//         current_number: null,
//         api_id: 2496,
//         api_hash: '8da85b0d5bfe62527e5b244c209159c3'
//     }

//     mtpInvokeApi("auth.sendCode", sendCodeCallParams)
//         .then(res => res.phone_code_hash)
//         .then(phone_code_hash => {
//             return codeInputPromise()
//                 .then((code) => {
//                     return { code, phone_code_hash }
//                 })
//         })
//         .then(({ code, phone_code_hash }) => {
//             const signUpCallParams = {
//                 phone_number: phoneNumber,
//                 phone_code_hash: phone_code_hash,
//                 phone_code: code,
//                 first_name: firstName,
//                 last_name: lastName
//             }

//             return mtpInvokeApi("auth.signUp", signUpCallParams)
//         })
//         .then(resolve)
//         .catch(reject)
// })

// export const signInUser = (phoneNumber, codeInputPromise) => new Promise((resolve, reject) => {
//     if (!isInitialized) {
//         reject(new Error('Not initialized!'))
//         return
//     }

//     const sendCodeCallParams = {
//         sms_type: 5,
//         phone_number: phoneNumber,
//         api_id: 2496,
//         api_hash: '8da85b0d5bfe62527e5b244c209159c3'
//     }

//     mtpInvokeApi("auth.sendCode", sendCodeCallParams)
//         .then(res => res.phone_code_hash)
//         .then(phone_code_hash => {
//             return codeInputPromise()
//                 .then((code) => {
//                     return { code, phone_code_hash }
//                 })
//         })
//         .then(({ code, phone_code_hash }) => {
//             const signInCallParams = {
//                 phone_number: phoneNumber,
//                 phone_code_hash: phone_code_hash,
//                 phone_code: code
//             }

//             return mtpInvokeApi("auth.signIn", signInCallParams)
//         })
//         .then(resolve)
//         .catch(reject)
// })

export const mtpInvokeApi = (method, params, options = {}) => new Promise((resolve, reject) => {
    if (!isInitialized) {
        reject(new Error('Not initialized!'))
        return
    }

    if (!params) {
        params = {};
    }

    params.api_id = appId;
    params.api_hash = appHash;

    //LogService.logVerbose(`[MtpProxy] mtpInvokeApi() ${JSON.stringify(method, 0, 2)} ${JSON.stringify(params, 0, 2)} ${JSON.stringify(options, 0, 2)}`)

    const rejectPromise = function (error) {
        if (!error) {
            error = { type: 'ERROR_EMPTY' }
        } else if (typeof (error) !== 'object') {
            error = { message: error }
        }

        if (error.code == 406) {
            error.handled = true
        }

        reject(error)
    }

    const requestPromise = function (networker) {
        let dcId = networker.getDcId()
        let prevDcId = getState().prev_dc_id
        let valid401Errors = ['AUTH_KEY_UNREGISTERED', 'AUTH_KEY_INVALID', 'AUTH_KEY_PERM_EMPTY'];


        return networker.wrapApiCall(method, params, options)
            .then(resolve)
            .catch(error => {
                console.error(method, params, options);
                console.log(error, dcId, prevDcId);
                //LogService.logError(`[MtpProxy] networker.wrapApiCall() ${new ErrorResponse(error)} ${prevDcId} ${dcId}`)

                if (error.code == 401 && (!prevDcId || (dcId == prevDcId))) {
                    rejectPromise(error)
                }
                else if (error.code == 401 && prevDcId && dcId != prevDcId && valid401Errors.indexOf(error.type) != -1) {
                    mtpInvokeApi('auth.exportAuthorization', { dc_id: dcId }, { dcId: prevDcId, noErrorBox: true })
                        .then((exportedAuth) =>
                            mtpInvokeApi('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true })
                        )
                        .then(() => mtpInvokeApi(method, params, options))
                        .then(resolve)
                        .catch(rejectPromise)
                }
                else if (error.code == 303) {
                    var newDcID = error.type.match(/^(PHONE_MIGRATE_|NETWORK_MIGRATE_|FILE_MIGRATE_|USER_MIGRATE_)(\d+)/)[2]
                    if (newDcID != dcId) {
                        setState({ prev_dc_id: dcId, current_dc_id: newDcID })
                        options.dcId = newDcID;
                        // @todo: do not change state on FILE_MIGRAGE???

                        mtpInvokeApi(method, params, options)
                            .then(resolve)
                            .catch(rejectPromise)
                    }
                }
                else if (!options.rawError && error.code == 420) {
                    const waitTime = error.type.match(/^FLOOD_WAIT_(\d+)/)[1] || 10
                    if (waitTime > (options.timeout || 60)) {
                        rejectPromise(error)
                        return
                    }

                    setTimeout(function () {
                        requestPromise(networker)
                    }, waitTime * 1000)
                }
                else if (!options.rawError && (error.code == 500 || error.type == 'MSG_WAIT_FAILED') && error.type != 'NEED_MEMBER_INVALID') {
                    const now = tsNow()
                    if (options.stopTime) {
                        if (now >= options.stopTime) {
                            rejectPromise(error)
                            return
                        }
                    } else {
                        options.stopTime = now + (options.timeout !== undefined ? options.timeout : 10) * 1000
                    }
                    options.waitTime = options.waitTime ? Math.min(60, options.waitTime * 1.5) : 1
                    setTimeout(function () {
                        requestPromise(networker)
                    }, options.waitTime * 1000)
                } else {
                    rejectPromise(error)
                }
            })
    }

    const currrentDcId = options.dcId || getState().current_dc_id
    mtpGetNetworker(currrentDcId, options)
        .then(requestPromise)
        .catch(rejectPromise)
})