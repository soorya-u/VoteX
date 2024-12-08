import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TOtp, otpSchema } from "@/schema/otp";
import { useContract } from "./use-context";
import { verifyNumber } from "@/api/number";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

type TUserType = "candidate" | "voter";

export const useOTP = (phoneNumber: string, userType: TUserType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);

  const router = useRouter();

  const { publicKey } = useContract();
  const { toast } = useToast();

  useEffect(() => {
    phoneNumber && setModalOpen(true);
  }, [phoneNumber]);

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<TOtp>({ resolver: zodResolver(otpSchema) });

  const { field } = useController({ control, name: "otp" });

  const onSubmit = async (val: TOtp) => {
    const res = await verifyNumber(`${val.otp}`, publicKey, userType);
    if (res._tag === "error")
      return toast({
        title: res.title,
        description: res.description,
        variant: "destructive",
      });

    toast({
      title: "Verification Successfull",
      description: "Your Verification was Successfull",
    });

    if (userType === "candidate") return router.push("/candidates");
    if (userType === "voter") setIsVerificationCompleted(true);
  };

  return {
    modalOpen,
    setModalOpen,
    control: field,
    isSubmitting,
    errors,
    isVerificationCompleted,
    handleSubmit: handleSubmit(onSubmit),
  };
};
