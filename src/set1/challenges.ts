import { singleByteXorCypher, XorDecruptResult } from "./xor-cypher-utils";
import { hammingDistance } from "./xor-cypher-utils";

export function breakRepatingXOR(input: number[]): string {
  return "";
}

export function findSingleCharXor(lines: string[]): XorDecruptResult {
  const results = lines.map((line) => singleByteXorCypher(Buffer.from(line)));

  const best = results.reduce((acc, current) => {
    if (current.score > acc.score) {
      return current;
    }
    return acc;
  });

  return best;
}

export function lowestDistanceGivenKeysize(
  input: Buffer,
  keySize: number
): number {
  const chunked = chunkArrayBuffer(input, keySize).slice(0, 4);
  let distance = 0;
  for (let i = 0; i < chunked.length - 1; i += 2) {
    distance += hammingDistance(chunked[i], chunked[i + 1]);
  }
  // const distance = hammingDistance(chunked[0], chunked[1]);
  return distance / chunkArrayBuffer.length;
}

export function findKeySize(input: Buffer): [number, number][] {
  const keyLengthResults: [number, number][] = [];
  const maxKeySize = 41;
  for (let keySize = 2; keySize <= maxKeySize; keySize++) {
    const score = lowestDistanceGivenKeysize(input, keySize);
    keyLengthResults.push([keySize, score]);
  }
  keyLengthResults.sort((x, y) => x[1] - y[1]);

  return keyLengthResults.slice(0, 5);
}

export function chunkArrayBuffer<T>(
  input: Buffer,
  chunkSize: number
): Array<Buffer> {
  const numChunks = Math.ceil(input.length / chunkSize);
  const result: Array<Buffer> = [];
  for (let i = 0; i < numChunks; i++) {
    const chunk = input.slice(i * chunkSize, (i + 1) * chunkSize);
    result.push(chunk);
  }

  return result;
}
