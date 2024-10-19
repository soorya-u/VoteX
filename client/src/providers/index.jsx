import { Toaster } from "react-hot-toast";
import ContractProvider from "./ContractProvider";

export default function Providers({ children }) {
  return (
    <ContractProvider>
      {children}
      <Toaster />
    </ContractProvider>
  );
}
