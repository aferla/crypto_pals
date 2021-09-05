export function bytesToString(bytes: number[]): string {
  return bytes.map((byte) => String.fromCharCode(byte)).join("");
}

export function bytesToHexString(bytes: number[]): string {
  return bytes.map((byte) => byte.toString(16)).join("");
}

export function hexStringToBytes(hexInput: string): number[] {
  const hexDigits = hexInput.match(/.{2}/g) ?? [];
  return hexDigits.map((digit) => parseInt(digit, 16));
}
