import {
  nativeToScVal as stellarNativeToScVal,
  Address,
  BASE_FEE,
  TransactionBuilder,
  xdr,
  StrKey,
  rpc,
  scValToNative as stellarScValToNative,
  Contract,
} from "@stellar/stellar-sdk";

import {
  networkPassphrase,
  UserContractFunctions,
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
  const key = await getContractKey(nativeKey);

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
      return Number(stellarScValToNative(value));
    default:
      return stellarScValToNative(value);
  }
};

export const callContract = async (
  functionName: UserContractFunctions,
  values: any = null,
  publicKey: string
) => {
  if (!publicKey) throw new Error("Wallet not connected");

  const account = await server.getAccount(publicKey);

  const parsedValues = Array.isArray(values)
    ? values.map((v: any) => nativeToScVal(v))
    : values === null
    ? null
    : nativeToScVal(values);

  const params = {
    fee: BASE_FEE,
    networkPassphrase,
  };

  const buildTx =
    parsedValues === null
      ? new TransactionBuilder(account, params)
          .addOperation(contract.call(functionName))
          .setTimeout(30)
          .build()
      : Array.isArray(parsedValues)
      ? new TransactionBuilder(account, params)
          .addOperation(contract.call(functionName, ...parsedValues))
          .setTimeout(30)
          .build()
      : new TransactionBuilder(account, params)
          .addOperation(contract.call(functionName, parsedValues))
          .setTimeout(30)
          .build();

  const prepareTx = await server.prepareTransaction(buildTx);
  const xdrTx = prepareTx.toXDR();
  const signedTx = await signTransaction(xdrTx, networkPassphrase, publicKey);
  const tx = TransactionBuilder.fromXDR(signedTx, networkPassphrase);

  try {
    const sendTx = await server.sendTransaction(tx);

    if (sendTx.errorResult) throw new Error("Unable to submit transaction");

    if (sendTx.status === "PENDING") {
      let txResponse = await server.getTransaction(sendTx.hash);
      while (txResponse.status === "NOT_FOUND") {
        txResponse = await server.getTransaction(sendTx.hash);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (txResponse.status === "SUCCESS") return txResponse.returnValue;
    }
  } catch (err) {
    console.log("Catch-2", err);
    return;
  }
};

const getContractKey = async (
  key: ContractVariables | [ContractVariables, string]
) => {
  if (Array.isArray(key)) {
    const [symbolString, addressString] = key;
    const symbol = nativeToScVal(symbolString, "symbol");
    const address = await stringToAddress(addressString);
    return stellarNativeToScVal([symbol, address]);
  }

  return nativeToScVal(key, "symbol");
};

const nativeToScVal = (value: any, type: "symbol" | "" = ""): xdr.ScVal => {
  if (typeof value === "string")
    if (value === value.toUpperCase() && value.length === 56 && value[0] == "G")
      return new Address(value).toScVal();
    else if (type === "symbol") return xdr.ScVal.scvSymbol(value);
    else return stellarNativeToScVal(value);

  if (typeof value === "number")
    return stellarNativeToScVal(value, { type: "u64" });

  if (Array.isArray(value)) {
    const parsedValues = value.map((v) => nativeToScVal(v));
    return stellarNativeToScVal(parsedValues);
  }

  return stellarNativeToScVal(undefined);
};

export const objectToAddress = (xdrObj: any) =>
  StrKey.encodeEd25519PublicKey(xdrObj._value._value.ed25519());

export const stringToAddress = async (
  value: string | undefined = undefined
) => {
  const pk = value || (await retrievePublicKey());
  const address = new Address(pk);
  return address.toScVal();
};
