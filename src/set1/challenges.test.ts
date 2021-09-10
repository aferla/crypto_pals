import fs from "fs";

import {
  hexToBase64String,
  base64ToHexString,
  hexToAsciiString,
} from "./conversion-utils";
import { findSingleCharXor, findKeySize } from "./challenges";

import {
  xor,
  singleByteXorCypher,
  repeatedKeyXor,
  hammingDistance,
} from "./xor-cypher-utils";

describe(`Challenge 1`, () => {
  it(`hexToBase64String should convert a hex string to base64 String`, () => {
    const result = hexToBase64String(
      "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
    );
    expect(result).toEqual(
      "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
    );
  });

  it(`base64ToHexString should convert a hex string to a base 64 string`, () => {
    const result = base64ToHexString(
      "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
    );
    expect(result).toEqual(
      "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
    );
  });
});

describe(`Challenge 2`, () => {
  it(`Xor should xor two strings`, () => {
    const result = xor(
      Buffer.from("1c0111001f010100061a024b53535009181c", "hex"),
      Buffer.from("686974207468652062756c6c277320657965", "hex")
    );
    expect(result.toString("hex")).toEqual(
      "746865206b696420646f6e277420706c6179"
    );
  });
});

describe(`Challenge 3`, () => {
  it(`find the single byte Xor cypher`, () => {
    const result = singleByteXorCypher(
      Buffer.from(
        "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736",
        "hex"
      )
    );
    expect(result.result).toEqual("Cooking MC's like a pound of bacon");
  });
});

describe(`Challenge 4`, () => {
  it(`detectSingleCharXor should detect line exncrypted with single character`, () => {
    const lines = fs
      .readFileSync("./data/set1_challenge4_input.txt", "ascii")
      .split("\n")
      .map((line) => hexToAsciiString(line));

    const result = findSingleCharXor(lines);
    expect(result.result).toEqual("Now that the party is jumping\n");
  });
});

describe(`Challenge 5`, () => {
  it(`repeating-key XOR should encrypt text as expected`, () => {
    const text = Buffer.from(
      "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal",
      "ascii"
    );
    const result = repeatedKeyXor(text, "ICE");
    expect(result.toString("hex")).toEqual(
      "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f"
    );
  });

  it(`repeating-key XOR should decrupt text as expected`, () => {
    const text = Buffer.from("Hello World this works!", "ascii");
    const encrypted = repeatedKeyXor(text, "ICE");
    const decrypted = repeatedKeyXor(encrypted, "ICE");
    expect(decrypted.toString()).toEqual(text.toString());
  });
});

describe(`Challenge 6`, () => {
  it(`hammingDistance should return the hamming distance of two strings`, () => {
    expect(
      hammingDistance(
        Buffer.from("this is a test", "ascii"),
        Buffer.from("wokka wokka!!!", "ascii")
      )
    ).toEqual(37);
  });

  it(`findKeySize should work wih a key of size 4`, () => {
    const encrypted: string = fs
      .readFileSync("./data/set1_challenge6_encrypted_4.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(encrypted, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize.map((entry) => entry[0])).toContain(4);
  });

  it(`findKeySize should work wih a key of size 6`, () => {
    const encrypted: string = fs
      .readFileSync("./data/set1_challenge6_encrypted_4.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(encrypted, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize.map((entry) => entry[0])).toContain(4);
  });

  it(`findKeySize should work wih a key of size 5`, () => {
    const encrypted: string = fs
      .readFileSync("./data/set1_challenge6_encrypted_5.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(encrypted, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize.map((entry) => entry[0])).toContain(5);
  });
});
