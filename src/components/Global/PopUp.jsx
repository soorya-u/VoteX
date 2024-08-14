import Link from "next/link";

const PopUp = ({ candidate }) => {
  return (
    <div className="custom-new">
      <div className="custom-card relative">
        <Link
          className="absolute right-[25px] top-[10px] font-medium font-cursive -rotate-[185deg]"
          href="/"
        >
          x
        </Link>
        <div className="custom-header">
          <span className="custom-icon">
            <img
              src={candidate?.image}
              className="size-[50px] rounded-[50px]"
              alt="candidate-image"
            />
          </span>
          <p className="custom-alert">Welcome {candidate?._name}!</p>
        </div>

        <p className="custom-message">
          We hope this message finds you well. This is a friendly reminder that
          you have successfully registered for our application. Please ensure
          that all your details are up to date and complete.
        </p>

        <p className="custom-message">
          Thank you for being a part of our community!
        </p>
        <div className="custom-actions">
          <Link className="custom-read" href="/">
            Status: {candidate?.status}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
