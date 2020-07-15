// import axios from 'axios'

// export function toArrayBuffer(buf) {
//     var ab = new ArrayBuffer(buf.length)
//     var view = new Uint8Array(ab)
//     for (var i = 0; i < buf.length; ++i) {
//         view[i] = buf[i]
//     }
//     return ab
// }

import { ModeOfOperationCTR } from 'Utils/aes';

let websockets = {};

function WSocket(url, dcId) {
    this._url = url;
    this._dcId = dcId;

    this.open();
};

WSocket.prototype.reconnect = function() {
    if (this._gonnaClose) {
        return false;
    }

    // this._socket.removeAllListeners();
    clearTimeout(this._reconnTimeout);
    this._reconnTimeout = setTimeout(()=>{
        this.log('reconnecting...');
        this.open();
    }, 1000);
};

WSocket.prototype.close = function() {
    if (this._socket) {
        this._gonnaClose = true;
        this._socket.close();
    }
};

WSocket.prototype.open = function() {
    this._networkCallback = null;

    this._socket = new WebSocket(this._url, 'binary');
    this._socket.binaryType = "arraybuffer";
    this.log('Initialization');

    this._incomePromiseResolvers = [];

    this._socket.addEventListener('message', (event) => {
        if(event.data instanceof ArrayBuffer) {
            // this.log('Message from server ', event.data);
            const resolver = this._incomePromiseResolvers.shift();

            let dec = this._decryptor.decrypt(new Uint8Array(event.data));
            // this.log('Decrypted', dec);
            // this.log(bytesFromWords(data));
            // let dec = this._decryptor.process(data);
            // this.log(dec);
            // dec = dec.concat(this._decryptor.finalize());
            // this.log(dec);
            // dec = new Uint8Array(bytesFromWords(dec));
            /// remove length
            if (dec[0] == 0x7f) {
                dec = dec.slice(4);
            } else {
                dec = dec.slice(1);
            }
            // this.log(new Int32Array(dec.buffer));

            if (resolver) {
                resolver(dec.buffer);
            } else {
                if (this._networkCallback) {
                    this._networkCallback({data: dec.buffer});
                } else {
                    console.error('Nobody waiting...');
                }
            }
        }
    });

    this._openResolver = null;
    this._openPromise = new Promise((res, rej)=>{
        this._openResolver = res;
    });

    this._socket.onopen = (event)=>{
        this.log('opened', event);
        this.setupObfuscation();
        this._openResolver();
    };

    this._socket.onclose = (event)=>{
        this.log('closed', event);
        this.reconnect(event);
    };

    this._socket.onerror = (event)=>{
        this.log('error', event);
        this.reconnect(event);
    };

    // setTimeout(()=>{
    //     this._socket.close();
    // }, 5000+Math.random()*5000);
};

WSocket.prototype.setupObfuscation = function() {
    let random = new Uint8Array(64);
    // new SecureRandom().nextBytes(random);

    // protocol
    random[56] = 0xef;
    random[57] = 0xef;
    random[58] = 0xef;
    random[59] = 0xef;

    let reversed = random.slice();
    reversed = reversed.reverse();

    let encrypt_key = random.slice(8,40);
    let encrypt_iv = random.slice(40,56);
    let decrypt_key = reversed.slice(8,40);
    let decrypt_iv = reversed.slice(40,56);

    this._encryptor = new ModeOfOperationCTR(encrypt_key, encrypt_iv); // aesEncryptor(encrypt_key, encrypt_iv);
    this._decryptor = new ModeOfOperationCTR(decrypt_key, decrypt_iv);

    let enc = this._encryptor.encrypt(random);

    random[56] = enc[56];
    random[57] = enc[57];
    random[58] = enc[58];
    random[59] = enc[59];

    this._socket.send(random);
}

WSocket.prototype.log = function(str, e) {
    console.warn('ws ('+this._dcId+'): ', str, e);
};

WSocket.prototype.setCallback = function(networkCallback) {
    this._networkCallback = networkCallback;
}

WSocket.prototype.send = function(data) {
    return new Promise((resolve, reject)=>{
        this._openPromise
            .then(()=>{
                const incomePromise = new Promise((res, rej)=>{
                    this._incomePromiseResolvers.push(res);
                });
                let mData = new Uint8Array(data.buffer);
                let length = mData.length / 4;

                let lenA = null; new Uint8Array(mData.length + 1);
                if (length < 0x7e) {
                    lenA = new Uint8Array(mData.length + 1);
                    lenA.set(mData, 1);
                    lenA[0] = length;
                } else {
                    lenA = new Uint8Array(mData.length + 4);
                    lenA.set(mData, 4);
                    lenA[0] = 0x7f;
                    lenA[1] = length & 0xFF;
                    lenA[2] = (length >> 8) & 0xFF;
                    lenA[3] = (length >> 16) & 0xFF;
                }

                let enc = this._encryptor.encrypt(lenA);

                try {
                    this._socket.send(enc);
                } catch (e){
                    this._socket.emit('error',e);
                }

                return incomePromise;
            })
            .then((data)=>{
                resolve(data);
            });
    });
};

// class WSocket {
//     constructor(url) {
//     }

//     log(str, e) {
//     }

//     async send(data) {
//         await this._openPromise;

//         const incomePromise = new Promise((res, rej)=>{
//             this._incomePromiseResolvers.push(res);
//         });

//         this._socket.send(data);
//         const res = await incomePromise;
//     }
// };

export const flushSockets = (url, dcId) => {
    console.error('Flush sockets');
    if (!url) {
        for (let u in websockets) {
            websockets[u].close();
        }
        websockets = {};
    } else {
        // if (websockets[url]) {
        //     websockets[url].close();
        // }
        websockets[url+dcId] = undefined;
    }
};

export const networkRequest = (url, dcId, requestData, networkCallback) => {
    try {
    // determine if url is for websocket
    if (url.indexOf('apiws') != -1 || url.indexOf('apis') != -1) {
        // going to use websocket
        if (websockets[url+dcId]) {
            // already have websocket for this url
        } else {
            console.log('Connecting to ', url, 'dcId', dcId);
            const socket = new WSocket(url, dcId);
            websockets[url+dcId] = socket;
        }

        return new Promise((resolve, reject)=>{
            if (networkCallback) {
                websockets[url+dcId].setCallback(networkCallback);
            }
            websockets[url+dcId].send(requestData)
                .then((data)=>{
                    resolve({data: data});
                });
        });

    } else {
        // going to use http/https queries
        //
        return new Promise((resolve, reject)=>{
            var oReq = new XMLHttpRequest;
            oReq.responseType = "arraybuffer";
            oReq.open("POST", url);

            oReq.onload = function (oEvent) {
              var arrayBuffer = oReq.response; // Note: not oReq.responseText
              oReq.abort();
              if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                resolve({data: byteArray.buffer});
              }
            };

            oReq.send(requestData);
        });
    }
    } catch(e) {
        console.log(e);
    }

}