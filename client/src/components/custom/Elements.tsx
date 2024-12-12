import { CalendarIcon } from "lucide-react";
import {
  UseFormRegister,
  FieldErrors,
  ControllerRenderProps,
} from "react-hook-form";
import moment from "moment";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormInputProps<T extends Record<string, any>> = {
  id: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

type FormControlProps<T extends Record<string, any>> = {
  id: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
  control: ControllerRenderProps<T>;
  errors: FieldErrors<T>;
};

export function FormInput<T extends Record<string, any>>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
}: FormInputProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(id)} className="text-white">
        {label}
      </Label>
      <Input
        id={String(id)}
        type={type}
        placeholder={placeholder}
        // @ts-expect-error Some Random Error
        {...register(String(id))}
        className="bg-[#2a2a2a] text-white border-secondary focus:border-primary rounded-md"
      />
      {errors[id] && (
        <span className="text-red-500 text-sm">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
}

export const FormDate = <T extends Record<string, any>>({
  id,
  label,
  placeholder,
  control,
  errors,
}: FormControlProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(id)} className="text-white">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !control.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {
              <span>
                {control.value
                  ? moment(control.value).format("MMM DD, YYYY")
                  : placeholder}
              </span>
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-transparent">
          <Calendar
            mode="single"
            selected={control.value as Date | undefined}
            numberOfMonths={2}
            fromYear={2000}
            disabled={(date) => date > moment().toDate()}
            onSelect={control.onChange}
          />
        </PopoverContent>
      </Popover>
      {errors[id] && (
        <span className="text-red-500 text-sm">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
};

export const FormSelect = <T extends Record<string, any>>({
  id,
  label,
  placeholder,
  control,
  errors,
}: FormControlProps<T>) => (
  <div className="space-y-2">
    <Label htmlFor={String(id)} className="text-white">
      {label}
    </Label>
    <Select value={control.value as string} onValueChange={control.onChange}>
      <SelectTrigger
        id={String(id)}
        className="bg-[#2a2a2a] text-white border-secondary focus:border-primary"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#00000060] backdrop-blur-sm">
        <SelectItem value="Male">Male</SelectItem>
        <SelectItem value="Female">Female</SelectItem>
        <SelectItem value="Transgender">Transgender</SelectItem>
      </SelectContent>
    </Select>
    {errors[id] && (
      <span className="text-red-500 text-sm">
        {errors[id]?.message as string}
      </span>
    )}
  </div>
);
