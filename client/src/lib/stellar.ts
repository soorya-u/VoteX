import {
  nativeToScVal,
  Address,
  BASE_FEE,
  TransactionBuilder,
  xdr,
  StrKey,
  rpc,
  scValToNative,
  Contract,
} from "@stellar/stellar-sdk";

import {
  networkPassphrase,
  ContractFunctions,
  ContractVariables,
  RPC_URL,
} from "@/constants/contract";

import { signTransaction, retrievePublicKey } from "@/lib/freighter";

export const server = new rpc.Server(RPC_URL, { allowHttp: true });
export const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID!);

export const getContractData = async (
  nativeKey: ContractVariables | [ContractVariables, string],
  type: "u64" | "address" | null = null
) => {
  let key: xdr.ScVal = stringToScValString("");

  if (typeof nativeKey === "string") key = stringToScValSymbol(nativeKey);

  if (Array.isArray(nativeKey)) {
    const [symbolString, addressString] = nativeKey;
    const symbol = stringToScValSymbol(symbolString);
    const address = await stringToAddress(addressString);
    key = nativeToScVal([symbol, address]);
  }

  const res = await server.getContractData(
    contract,
    key,
    rpc.Durability.Persistent
  );
  // @ts-ignore
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

export const callContract = async (
  functionName: ContractFunctions,
  values: any,
  publicKey: string
) => {
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

export const stringToScValString = (value: string) => nativeToScVal(value);
export const stringToScValSymbol = (value: string) =>
  xdr.ScVal.scvSymbol(value);
export const numberToU64 = (value: number) =>
  nativeToScVal(value, { type: "u64" });
export const objectToAddress = (xdrObj: any) =>
  StrKey.encodeEd25519PublicKey(xdrObj._value._value.ed25519());
export const stringToAddress = async (
  value: string | undefined = undefined
) => {
  const pk = value || (await retrievePublicKey());
  const address = new Address(pk);
  return address.toScVal();
};
