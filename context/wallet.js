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
  let publicKey = "";
  let error = "";
  try {
    publicKey = await requestAccess();
  } catch (e) {
    error = e;
  }
  if (error) {
    return error;
  }
  return publicKey;
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

export const connectWallet = async () => {
  if (!(await isConnected()))
    await setAllowed().then(async () => setIsWalletConnected(true));
};
