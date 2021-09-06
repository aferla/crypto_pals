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
