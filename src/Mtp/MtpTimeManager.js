import { tsNow, dT, nextRandomInt, longFromInts, longToInts } from '../Utils'
import { getState, setState } from '../state'
import { ErrorResponse } from '../Services'
import { str2bigInt, greater, addInt, bigInt2str, modInt } from '../Utils/leemonBigInt'

let lastMessageID = [0, 0]
let lastBigInt = null;
let timeOffset = 0
let lastServerBigInt = null;

const to = getState().server_time_offset

if (to) {
    timeOffset = to
}

function generateMessageID() {
    var timeTicks = tsNow(),
        timeSec = Math.floor(timeTicks / 1000) + timeOffset,
        timeMSec = timeTicks % 1000,
        random = nextRandomInt(0xFFFF)

    var messageID = [timeSec, (timeMSec << 21) | (random << 3) | 4]
    if (lastMessageID[0] > messageID[0] ||
        lastMessageID[0] == messageID[0] && lastMessageID[1] >= messageID[1]) {
        messageID = [lastMessageID[0], lastMessageID[1] + 4]
    }

    var longFrom = longFromInts(messageID[0], messageID[1]);
    lastBigInt = str2bigInt(longFrom, 10);
    lastMessageID = messageID;

    if (lastServerBigInt && greater(lastServerBigInt, lastBigInt)) {
        //18: incorrect two lower order msg_id bits (the server expects client message msg_id to be divisible by 4)
        lastServerBigInt = addInt(lastServerBigInt, 100000-modInt(lastServerBigInt, 4));
        return bigInt2str(lastServerBigInt, 10);
    } else {
        return longFrom;
    }
}

function setLastMessageID(str) {

    let toSet = str2bigInt(str, 10);

    if (lastServerBigInt && greater(lastServerBigInt, toSet)) {

    } else {
        // console.error('setLastMessageID', str);
        lastServerBigInt = toSet;
    }

    // console.warn('was', lastBigInt);
    // console.warn('to', toSet);

    // if (greater(toSet, lastBigInt)) {
    //     shiftOffset+=60;
    //     console.warn('was greater');
    // }


    // if (toSet[0] > lastMessageID[0] ||
    //     toSet[0] == lastMessageID[0] && toSet[1] >= lastMessageID[1]) {
    //     console.warn('was greater');
    //     lastMessageID = [toSet[0], toSet[1] + 4]
    // }
}

export function applyServerTime(serverTime, localTime) {
    const newTimeOffset = serverTime - Math.floor((localTime || tsNow()) / 1000)
    const changed = Math.abs(timeOffset - newTimeOffset) > 10

    setState({ server_time_offset: newTimeOffset })

    lastMessageID = [0, 0]
    timeOffset = newTimeOffset

    return changed
}

export const generateID = generateMessageID
export const setLastID = setLastMessageID


