"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketLog = exports.apiLog = exports.warn = exports.log = void 0;
const getTime = (timer) => {
    const time = timer
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    const day = timer.getDate().toString().padStart(2, "0");
    const month = timer.getMonth().toString().padStart(2, "0");
    const year = timer.getFullYear();
    return `\x1B[92m[${time} - ${day}/${month}/${year}]\x1B[0m`;
};
const log = (message) => {
    console.log(getTime(new Date()), message);
};
exports.log = log;
const warn = (message) => {
    const waring = "\x1B[93mWarning:\x1B[0m";
    console.log(getTime(new Date()), waring, message);
};
exports.warn = warn;
const apiLog = (message) => {
    const socket = "\x1B[94mAPI Message:\x1B[0m";
    console.log(getTime(new Date()), socket, message);
};
exports.apiLog = apiLog;
const socketLog = (message) => {
    const socket = "\x1B[95mSocket Event:\x1B[0m";
    console.log(getTime(new Date()), socket, message);
};
exports.socketLog = socketLog;
