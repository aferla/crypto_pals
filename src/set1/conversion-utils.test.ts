import { bytesToString, hexStringToBytes } from "./conversion-utils";

describe(`conversion utils`, () => {
  it(`hexStringToBytes should convert hello to bytes`, () => {
    const result = hexStringToBytes("68656c6c6f");
    const theString = bytesToString(result);
    expect(theString).toEqual("hello");
  });
});
