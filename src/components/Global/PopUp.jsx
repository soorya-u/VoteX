import Link from "next/link";

const PopUp = ({ candidate }) => {
  return (
    // Check rgba
    <div className="fixed top-0 left-0 size-full bg-[#01000042] flex justify-center items-center">
      <div className="relative max-w-80 border border-[#141414] rounded-2xl bg-[#141414] p-4">
        <Link
          className="absolute right-[25px] top-[10px] font-[500] text-xl font-[cursive] -rotate-[185deg]"
          href="/"
        >
          x
        </Link>
        <div className="flex items-center gap-4">
          <span className="shrink-0 flex items-center justify-center rounded-full bg-[#f73859] p-2 text-white">
            <img
              src={candidate?.image}
              className="size-[50px] rounded-[50px]"
              alt=""
            />
          </span>
          <p className="font-[600] text-[#6b7280]">
            Welcome {candidate?._name}!
          </p>
        </div>

        <p className="mt-4 text-[#6b7280]">
          We hope this message finds you well. This is a friendly reminder that
          you have successfully registered for our application. Please ensure
          that all your details are up to date and complete.
        </p>

        <p className="mt-4 text-[#6b7280]">
          Thank you for being a part of our community!
        </p>
        <div className="mt-6">
          <Link
            className="no-underline inline-block rounded-lg w-full py-3 px-5 text-center text-sm font-[600] bg-[#f73859] text-[#fff6e9] hover:text-[#f73859] hover:bg-[#fff6e9]"
            href="/"
          >
            Status: {candidate?.status}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
