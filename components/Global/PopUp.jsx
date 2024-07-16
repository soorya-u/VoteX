import Link from "next/link";

const PopUp = ({ candidate }) => {
  return (
    <div className="custom-new">
      <div
        style={{
          position: "relative",
        }}
        className="custom-card"
      >
        <Link href="/">
          <a
            style={{
              position: "absolute",
              right: 25,
              top: 10,
              fontWeight: 500,
              fontSize: "1.2rem",
              fontFamily: "cursive",
              rotate: "-185deg",
            }}
          >
            x
          </a>
        </Link>
        <div className="custom-header">
          <span className="custom-icon">
            <img
              src={candidate?.image}
              style={{
                with: "50px",
                height: "50px",
                borderRadius: "50px",
              }}
              alt=""
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
          <Link href="/">
            <a className="custom-read">Status: {candidate?.status}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
