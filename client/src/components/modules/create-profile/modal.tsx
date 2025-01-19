"use client";

import { useCallback, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Webcam from "react-webcam";

import { registerFace } from "@/api/face";

import { useToast } from "@/hooks/use-toast";
import { useOTP } from "@/hooks/use-otp";
import { useUser } from "@/hooks/use-context";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { bas64ToImage } from "@/utils/base64-image";

type FormModalProps = {
  phoneNumber: string;
  userType: "candidate" | "voter";
};

export default function FormModal({ phoneNumber, userType }: FormModalProps) {
  const {
    modalOpen,
    control,
    errors,
    isSubmitting,
    handleSubmit,
    isVerificationCompleted,
  } = useOTP(phoneNumber, userType);

  return (
    <Dialog open={modalOpen}>
      <DialogContent className="disable-close sm:max-w-[600px]">
        {!isVerificationCompleted ? (
          <form className="grid w-full gap-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Verify your Aadhaar Card</DialogTitle>
              <DialogDescription>
                A 6 Digit OTP has beem sent to +91 {phoneNumber}. Please Enter
                the OTP below:
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-2">
              <InputOTP
                value={String(control.value || "")}
                onChange={control.onChange}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors && errors.otp && (
                <span className="text-xs text-red-500">
                  {errors.otp.message}
                </span>
              )}
            </div>
            <DialogFooter className="justify-center">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <WebCamModalContent />
        )}
      </DialogContent>
    </Dialog>
  );
}

const WebCamModalContent = () => {
  const webCamRef = useRef<Webcam>(null);

  const [isCapturedState, setIsCapturedState] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const router = useRouter();

  const { publicKey, refetchUserVoter } = useUser();
  const { toast } = useToast();

  const capture = useCallback(() => {
    const imageSource = webCamRef.current && webCamRef.current.getScreenshot()!;
    if (!imageSource) return;
    setImageSrc(imageSource);
    setIsCapturedState(true);
  }, [webCamRef]);

  const reCapture = () => {
    setImageSrc("");
    setIsCapturedState(false);
  };

  const mutationFn = async () => {
    try {
      if (!imageSrc)
        return toast({
          title: "Invalid Image",
          description: "Image might not have been Captured",
          variant: "destructive",
        });

      const file = bas64ToImage(imageSrc);

      const formData = new FormData();
      formData.append("file", file);

      const res = await registerFace(formData, publicKey);

      if (res._tag === "error")
        return toast({
          title: res.title,
          description: res.description,
          variant: "destructive",
        });

      toast({
        title: "Face Registration Successfull",
        description: "Your face has been registered",
        variant: "default",
      });

      await refetchUserVoter();

      return router.push("/voters");
    } catch {
      return toast({
        title: "Something went Wrong!",
        description: "Something went wrong while capturing Image",
        variant: "destructive",
      });
    }
  };

  const { isPending: loading, mutateAsync } = useMutation({ mutationFn });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          Register your Face Verification
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center gap-2">
        {imageSrc ? (
          <img src={imageSrc} />
        ) : (
          <Webcam
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "user" }}
            screenshotQuality={1}
            ref={webCamRef}
            className="rounded-md"
          />
        )}
      </div>
      <DialogFooter className="sm:justify-center">
        {!isCapturedState ? (
          <Button disabled={loading} onClick={capture}>
            Capture
          </Button>
        ) : (
          <>
            <Button disabled={loading} onClick={reCapture}>
              Recapture
            </Button>
            <Button
              className="min-w-32"
              disabled={loading}
              onClick={async () => await mutateAsync()}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </>
        )}
      </DialogFooter>
    </>
  );
};
