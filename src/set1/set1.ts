import {
  hexStringToBytes,
  bytesToString,
  textToBytes,
} from "./conversion-utils";

export function base64Encode(hexInput: string): string {
  const byteArray = hexStringToBytes(hexInput);
  const text = bytesToString(byteArray);
  const buffer = Buffer.from(text);
  return buffer.toString("base64");
}

export function xor(input1: number[], input2: number[]): number[] {
  const bytes = input1.map((inputBytes, i) => inputBytes ^ input2[i]);
  return bytes;
}

export function repeatedKeyXor(input: string, key: string): number[] {
  const cypher = key
    .repeat(Math.ceil(input.length / key.length))
    .substring(0, input.length);
  return xor(textToBytes(input), textToBytes(cypher));
}

type XorDecruptResult = {
  cypher: string;
  score: number;
  result: string;
};

export function singleByteXorCypher(hexInput: string): XorDecruptResult {
  const hexInputLength = hexInput.length;
  const letters = Array.from(Array(128)).map((c, i) => String.fromCharCode(i));

  let best = {
    cypher: "",
    score: 0,
    result: "",
  };
  letters.forEach((letter) => {
    const cypher = letter.charCodeAt(0).toString(16).repeat(hexInputLength);
    const xorResult = xor(hexStringToBytes(hexInput), hexStringToBytes(cypher));
    const text = bytesToString(xorResult);
    const score = scoreText(text);
    if (score >= best.score) {
      best = {
        score: score,
        result: text,
        cypher: letter,
      };
    }
  });

  return best;
}

export function scoreText(text: string): number {
  const noCharacters = (text.match(/[\w\s]/g) || []).length;
  const numSpacesCount = (text.match(/[\s]/g) || []).length;
  if (noCharacters === text.length) {
    return noCharacters;
  }
  return noCharacters / (text.length - noCharacters) + numSpacesCount;
}

export function detectSingleCharXor(lines: string[]): XorDecruptResult {
  const results = lines.map((line) => singleByteXorCypher(line));

  const best = results.reduce((acc, current) => {
    if (current.score > acc.score) {
      return current;
    }
    return acc;
  });

  return best;
}
