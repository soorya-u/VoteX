import {
  requestAccess,
  signTransaction as frieghterSignTransaction,
  setAllowed,
} from "@stellar/freighter-api";

export async function checkConnection() {
  const { isAllowed } = await setAllowed();
  if (isAllowed) return isAllowed;
}

export const retrievePublicKey = async () => {
  const { address, error } = await requestAccess();
  if (error) console.log(error);
  return address;
};

export const signTransaction = async (
  xdr: string,
  networkPassphrase: string,
  address: string,
) => {
  const { signedTxXdr, error } = await frieghterSignTransaction(xdr, {
    networkPassphrase,
    address,
  });
  if (error) console.log(error);
  return signedTxXdr;
};
