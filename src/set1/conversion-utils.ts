export function hexToBase64String(hexInput: string): string {
  return Buffer.from(hexInput, "hex").toString("base64");
}

export function base64ToHexString(base64Input: string): string {
  return Buffer.from(base64Input, "base64").toString("hex");
}

export function hexToAsciiString(input: string): string {
  return Buffer.from(input, "hex").toString();
}

export function bytesToString(bytes: number[]): string {
  return bytes.map((byte) => String.fromCharCode(byte)).join("");
}

//TODO: Include zero padding
export function bytesToHexString(bytes: number[]): string {
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function hexStringToBytes(hexInput: string): number[] {
  const hexDigits = hexInput.match(/.{2}/g) ?? [];
  return hexDigits.map((digit) => parseInt(digit, 16));
}

export function textToBytes(input: string): number[] {
  return input.split("").map((c) => c.charCodeAt(0));
}
