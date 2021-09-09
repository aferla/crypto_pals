import { singleByteXorCypher, XorDecruptResult } from "./xor-cypher-utils";
import { hammingDistance } from "./xor-cypher-utils";

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

export function findKeySize(input: Buffer): [number, number][] {
  const keyLengthResults: [number, number][] = [];
  const maxKeySize = 41;
  for (let keySize = 2; keySize <= maxKeySize; keySize++) {
    const score = lowestDistanceGivenKeysize(input, keySize);
    keyLengthResults.push([keySize, score]);
  }
  keyLengthResults.sort((x, y) => x[1] - y[1]);
  const print = keyLengthResults.map((entry) => `* ${entry}`).join("\n");
  console.log(print);

  return keyLengthResults.slice(0, 4);
}

export function breakRepatingXOR(input: number[]): string {
  return "";
}

function lowestDistanceGivenKeysize(input: Buffer, keySize: number): number {
  //   const chunkedArray = chunkArray(input, keySize,;

  let distance = 0;
  if (keySize === 11) {
    console.log(`*Yo ${input.slice(0, 7)}`);
  }
  const chunked = chunkArrayBuffer(input, keySize);
  for (let i = 0; i < 4; i++) {
    const firstSlice = chunked[i];
    const secondSlice = chunked[i + 1];

    distance += hammingDistance(firstSlice, secondSlice);
  }
  distance /= 4;
  return distance / keySize;
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
