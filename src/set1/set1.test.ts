import { base64Encode, xor, singleByteXorCypher } from "./set1";

import { bytesToHexString } from "./conversion-utils";

describe(`Set 1`, () => {
  it(`base64Encode should convert bytes to base64 String`, () => {
    const result = base64Encode(
      "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
    );
    expect(result).toEqual(
      "SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t"
    );
  });

  it(`Xor should xor two strings`, () => {
    const result = xor(
      "1c0111001f010100061a024b53535009181c",
      "686974207468652062756c6c277320657965"
    );
    expect(bytesToHexString(result)).toEqual(
      "746865206b696420646f6e277420706c6179"
    );
  });

  it(`singleByteXorCypher should work`, () => {
    const result = singleByteXorCypher(
      "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
    );
    expect(result).toEqual("Cooking MC's like a pound of bacon");
  });
});
