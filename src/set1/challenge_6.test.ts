import { chunkArrayBuffer, findKeySize } from "./challenges";
import fs from "fs";
import { bytesToString, textToBytes } from "./conversion-utils";

describe("challenge_6", () => {
  it("chunkArray should chunk an chunkArrayBuffer", () => {
    const array = Buffer.from("abcdefg", "ascii");
    const result = chunkArrayBuffer(array, 3);
    expect(result).toHaveLength(3);
  });

  it("findKeySize", () => {
    const fileData: string = fs
      .readFileSync("./data/set1_challenge6_input.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(fileData, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize).toEqual([
      [2, 2.25],
      [5, 2.6],
      [29, 2.8189655172413794],
      [3, 2.8333333333333335],
    ]);
  });

  it("findKeySize 2", () => {
    const encrypted: string = fs
      .readFileSync("./data/set1_challenge6_encrypted_4.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(encrypted, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize.map((entry) => entry[0])).toContain(4);
  });

  it("findKeySize 3", () => {
    const encrypted: string = fs
      .readFileSync("./data/set1_challenge6_encrypted_6.txt", "utf-8")
      .replace("\n", "");
    const buffer = Buffer.from(encrypted, "base64");
    const keySize = findKeySize(buffer);
    expect(keySize.map((entry) => entry[0])).toContain(6);
  });
});
