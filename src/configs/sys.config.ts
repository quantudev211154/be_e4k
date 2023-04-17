const getTime = (timer: Date): string => {
  const time: string = timer
    .toTimeString()
    .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  const day = timer.getDate().toString().padStart(2, "0");
  const month = timer.getMonth().toString().padStart(2, "0");
  const year = timer.getFullYear();
  return `\x1B[92m[${time} - ${day}/${month}/${year}]\x1B[0m`;
};

export const log = (message: any) => {
  console.log(getTime(new Date()), message);
};

export const warn = (message: any) => {
  const waring = "\x1B[93mWarning:\x1B[0m";
  console.log(getTime(new Date()), waring, message);
};

export const apiLog = (message: any) => {
  const socket = "\x1B[94mAPI Message:\x1B[0m";
  console.log(getTime(new Date()), socket, message);
};

export const socketLog = (message: any) => {
  const socket = "\x1B[95mSocket Event:\x1B[0m";
  console.log(getTime(new Date()), socket, message);
};
