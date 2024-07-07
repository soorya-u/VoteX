import { Contract, SorobanRpc } from "@stellar/stellar-sdk";
import toast from "react-hot-toast";

export const ownerPublicKey = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export const server = new SorobanRpc.Server(
  "https://soroban-testnet.stellar.org",
  {
    allowHttp: true,
  }
);

export const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID);

export const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
export const notifyError = (msg) => toast.error(msg, { duration: 2000 });