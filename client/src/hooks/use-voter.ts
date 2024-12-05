import { TVoter, voterSchema } from "@/schema/voter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useVoter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVoter>({ resolver: zodResolver(voterSchema) });

  const onSubmit = (val: TVoter) => {
    console.log(val);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
