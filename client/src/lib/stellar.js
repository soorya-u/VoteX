import {
  nativeToScVal,
  Address,
  BASE_FEE,
  TransactionBuilder,
  xdr,
  StrKey,
  rpc,
  scValToNative,
} from "@stellar/stellar-sdk";
import { server, contract, networkPassphrase } from "@/constants/contract";
import { signTransaction, retrievePublicKey } from "@/lib/freighter";

export const stringToScValString = (value) => nativeToScVal(value);
export const stringToScValSymbol = (value) => xdr.ScVal.scvSymbol(value);
export const numberToU64 = (value) => nativeToScVal(value, { type: "u64" });
export const objectToAddress = (xdrObj) =>
  StrKey.encodeEd25519PublicKey(xdrObj._value._value.ed25519());

export const stringToAddress = async (value = undefined) => {
  const pk = value || (await retrievePublicKey());
  const address = new Address(pk);
  return address.toScVal();
};

export const getContractData = async (key, type = null) => {
  if (typeof key === "string") key = stringToScValSymbol(key);
  if (Array.isArray(key)) {
    const [symbolString, addressString] = key;
    const symbol = stringToScValSymbol(symbolString);
    const address = await stringToAddress(addressString);
    key = nativeToScVal([symbol, address]);
  }

  const res = await server.getContractData(
    contract,
    key,
    rpc.Durability.Persistent
  );
  const value = res.val.value().val();

  switch (type) {
    case "address":
      return objectToAddress(value);
    case "u64":
      return Number(scValToNative(value));
    default:
      return scValToNative(value);
  }
};

export const callContract = async (functionName, values, publicKey) => {
  if (!publicKey) throw new Error("Wallet not connected");

  const account = await server.getAccount(publicKey);

  const params = {
    fee: BASE_FEE,
    networkPassphrase,
  };

  let buildTx;

  if (values === null) {
    buildTx = new TransactionBuilder(account, params)
      .addOperation(contract.call(functionName))
      .setTimeout(30)
      .build();
  } else if (Array.isArray(values)) {
    buildTx = new TransactionBuilder(account, params)
      .addOperation(contract.call(functionName, ...values))
      .setTimeout(30)
      .build();
  } else {
    buildTx = new TransactionBuilder(account, params)
      .addOperation(contract.call(functionName, values))
      .setTimeout(30)
      .build();
  }

  const prepareTx = await server.prepareTransaction(buildTx);
  const xdrTx = prepareTx.toXDR();
  const signedTx = await signTransaction(xdrTx, "TESTNET", publicKey);
  const tx = TransactionBuilder.fromXDR(signedTx, networkPassphrase);

  try {
    let sendTx = await server.sendTransaction(tx).catch((err) => {
      console.log("Catch-1", err);
      return err;
    });
    if (sendTx.errorResult) {
      throw new Error("Unable to submit transaction");
    }
    if (sendTx.status === "PENDING") {
      let txResponse = await server.getTransaction(sendTx.hash);
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await server.getTransaction(sendTx.hash);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (txResponse.status === "SUCCESS") {
        let result = txResponse.returnValue;
        return result;
      }
    }
  } catch (err) {
    console.log("Catch-2", err);
    return;
  }
};
