export type XorDecruptResult = {
  cypher: string;
  score: number;
  result: string;
};

export function xor(input1: Buffer, input2: Buffer): Buffer {
  const bytes = input1.map((inputBytes, i) => inputBytes ^ input2[i]);
  return Buffer.from(bytes);
}

export function repeatedKeyXor(input: Buffer, key: string): Buffer {
  const cypher = key
    .repeat(Math.ceil(input.length / key.length))
    .substring(0, input.length);
  console.log(`Cypher is ${cypher}`);
  return xor(input, Buffer.from(cypher, "ascii"));
}

export function singleByteXorCypher(input: Buffer): XorDecruptResult {
  const hexInputLength = input.length;
  const letters = Array.from(Array(128)).map((c, i) => String.fromCharCode(i));

  let best = {
    cypher: "",
    score: 0,
    result: "",
  };

  letters.forEach((letter) => {
    const cypher = Buffer.from(
      letter.charCodeAt(0).toString(16).repeat(hexInputLength),
      "hex"
    );
    const xorResult = xor(input, cypher);
    const text = xorResult.toString();
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

export function hammingDistance(input1: Buffer, input2: Buffer): number {
  if (input1.length !== input2.length) {
    throw Error("Inputs must be the same length");
  }

  const xored = xor(input1, input2);
  const bits = Array.from(xored.entries())
    .map((pair) => pair[1].toString(2))
    .join("");

  return (bits.match(/1/g) || []).length;
}
