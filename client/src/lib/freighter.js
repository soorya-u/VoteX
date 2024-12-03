import {
  requestAccess,
  signTransaction as frieghterSignTransaction,
  setAllowed,
} from "@stellar/freighter-api";

export async function checkConnection() {
  const isAllowed = await setAllowed();
  if (isAllowed) {
    return isAllowed;
  }
}

export const retrievePublicKey = async () => {
  const { address, error } = await requestAccess();
  if (error) console.log(error);
  return address;
};

export const signTransaction = async (xdr, network, signWith) => {
  try {
    return await frieghterSignTransaction(xdr, {
      network,
      accountToSign: signWith,
    });
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
