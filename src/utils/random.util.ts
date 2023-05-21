import { v4 as uuidV4 } from "uuid";

function generateRandomHEXAColor(): string {
  return (
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
  );
}

export function generateRandomUUID(): string {
  return `${uuidV4()}`;
}
