import { TCandidate, candidateSchema } from "@/schema/candidate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCandidat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCandidate>({ resolver: zodResolver(candidateSchema) });

  const onSubmit = (val: TCandidate) => {
    console.log(val);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
