import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TPayment, paymentSchema } from "@/schema/others";
import { useUser } from "./use-context";
import { useToast } from "./use-toast";
import { sendPayment } from "@/lib/stellar";

export const usePayment = (candidateAddress: string) => {
  const { publicKey } = useUser();
  const { toast } = useToast();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<TPayment>({ resolver: zodResolver(paymentSchema) });

  const onSubmit = async (val: TPayment) => {
    const { tag } = await sendPayment(
      publicKey,
      candidateAddress,
      `${val.amount}`,
    );
    if (tag === "NotFoundError")
      return toast({
        title: "Invalid Candidate",
        description: "The Public Address of Candidate is Inavlid!",
        variant: "destructive",
      });
    if (tag === "Error")
      return toast({
        title: "Something went Wrong!",
        description: "Something went wrong During Transaction",
        variant: "destructive",
      });

    return toast({
      title: "Payment Completed",
      description: "The Transaction Amount has been sent to the Candidate",
    });
  };

  return {
    isSubmitting,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    register,
  };
};
