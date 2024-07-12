import {
  nativeToScVal,
  scValToNative as scValToNativeFn,
  Address,
  BASE_FEE,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import { server, contract, networkPassphrase } from "@/constants/contract";
import { signTransaction } from "@/lib/freighter";

export const stringToScValString = (value) => {
  return nativeToScVal(value);
};

export const numberToU64 = (value) => {
  return nativeToScVal(value, { type: "u64" });
};

export const stringToAddress = async (value = undefined) => {
  const pk = value || (await retrievePublicKey());
  return new Address(pk).toScVal();
};

export const scValToNative = async (value) => {
  return scValToNativeFn(value);
};

export const callContract = async (
  functionName,
  values,
  isWalletConnected,
  publicKey
) => {
  if (!isWalletConnected) return;

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
