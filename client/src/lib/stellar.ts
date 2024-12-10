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
  Horizon,
  NotFoundError,
  Operation,
  Asset,
  Memo,
} from "@stellar/stellar-sdk";

import {
  networkPassphrase,
  ContractFunctions,
  ContractVariables,
  HORIZON_URL,
  RPC_URL,
} from "@/constants/contract";

import { snakeToCamelConvertor } from "@/utils/case-convertor";

import { signTransaction } from "@/lib/freighter";

const horizonServer = new Horizon.Server(HORIZON_URL);
export const server = new rpc.Server(RPC_URL, { allowHttp: true });
export const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID!);

export const getContractData = async (
  nativeKey: ContractVariables | [ContractVariables, string]
) => {
  const key = await getContractKey(nativeKey);

  const res = await server.getContractData(
    contract,
    key,
    rpc.Durability.Persistent
  );

  const contract_data = res.val.value() as xdr.ContractDataEntry;
  const value = contract_data.val();

  const native = stellarScValToNative(value);

  if (Array.isArray(native) || typeof native !== "object")
    return typeof native === "bigint" ? Number(native) : native;

  const camelObject = snakeToCamelConvertor(native);
  Object.entries(camelObject).map(([k, v]) => {
    if (typeof v === "bigint") camelObject[k] = Number(v);
  });

  return camelObject;
};

export const callContract = async (
  functionName: ContractFunctions,
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
    console.error("Unable to process transaction: ", err);
    return;
  }
};

export const sendPayment = async (
  sourceAddress: string,
  destinationAddress: string,
  amount: string
): Promise<{ tag: "NotFoundError" | "Error" | "Ok" }> => {
  try {
    await horizonServer.loadAccount(destinationAddress);
  } catch (err) {
    return err instanceof NotFoundError
      ? { tag: "NotFoundError" }
      : { tag: "Error" };
  }

  try {
    const account = await server.getAccount(sourceAddress);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    });

    const paymentOperation = Operation.payment({
      amount,
      // Lumen/XLM Currency
      asset: Asset.native(),
      destination: destinationAddress,
    });

    const buildTx = transaction
      .addOperation(paymentOperation)
      .addMemo(Memo.text("Anonymous Donation from DemocraChain"))
      .setTimeout(180)
      .build();

    const xdrTx = buildTx.toXDR();

    const signedXdrTx = await signTransaction(
      xdrTx,
      networkPassphrase,
      sourceAddress
    );

    const signedTx = TransactionBuilder.fromXDR(signedXdrTx, networkPassphrase);
    await horizonServer.submitAsyncTransaction(signedTx);

    return { tag: "Ok" };
  } catch (err) {
    console.log("Unable to process payment: ", err);
    return { tag: "Error" };
  }
};

const getContractKey = async (
  key: ContractVariables | [ContractVariables, string]
) => {
  if (Array.isArray(key)) {
    const [symbolString, addressString] = key;
    const symbol = nativeToScVal(symbolString, "symbol");
    const address = nativeToScVal(addressString);
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
