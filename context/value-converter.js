import { nativeToScVal } from "@stellar/stellar-sdk";

export const stringToScValString = (value) => {
  return nativeToScVal(value);
};

export const numberToU64 = (value) => {
  return nativeToScVal(value, { type: "u64" });
};
