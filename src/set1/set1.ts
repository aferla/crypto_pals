import { hexStringToBytes, bytesToString } from "./conversion-utils";

export function base64Encode(hexInput: string): string {
  const byteArray = hexStringToBytes(hexInput);
  const text = bytesToString(byteArray);
  const buffer = Buffer.from(text);
  return buffer.toString("base64");
}

export function xor(input1: string, input2: string): number[] {
  const input1Bytes = hexStringToBytes(input1);
  const input2Bytes = hexStringToBytes(input2);

  const bytes = input1Bytes.map((input1, i) => input1 ^ input2Bytes[i]);
  return bytes;
}

export function singleByteXorCypher(hexInput: string): string {
  const hexInputLength = hexInput.length;
  const letters = Array.from(Array(128)).map((c, i) => String.fromCharCode(i));

  const textAndWeights = letters.map((letter) => {
    const cypher = letter.charCodeAt(0).toString(16).repeat(hexInputLength);
    const xorResult = xor(hexInput, cypher);
    const text = bytesToString(xorResult);
    return {
      letter: letter,
      result: text,
      score: scoreText(text),
    };
  });

  textAndWeights.sort((e1, e2) => {
    if (e1.score === e2.score) {
      const eCount1 = (e1.result.match(/\s/g) || []).length;
      const eCount2 = (e2.result.match(/\s/g) || []).length;

      return eCount1 - eCount2;
    }
    return e1.score - e2.score;
  });

  return textAndWeights[textAndWeights.length - 1].result;
}

export function scoreText(text: string): number {
  const noCharacters = (text.match(/[\x20-\x7E]/g) || []).length;
  if (noCharacters === text.length) {
    return noCharacters;
  }
  return noCharacters / (text.length - noCharacters);
}
