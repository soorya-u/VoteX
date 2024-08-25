import Link from "next/link";

const WhyVote = () => {
  return (
    <section className="why-trade s1-bg alt-color relative z-0">
      <div className="animation absolute top-0 left-0 w-full h-full -z-[1]">
        <img
          src="assets/images/sun.png"
          alt="vector"
          className="absolute push_animat"
        />
        <img
          src="assets/images/star.png"
          alt="vector"
          className="absolute  d-xxxl-flex previewSkew"
        />
      </div>
      <div className="container">
        <div className="row gy-3 gy-lg-0 justify-center">
          <div className="col-sm-7 col-lg-6 col-xxl-5 order-2 order-lg-0">
            <div className="why-trade__thumbs h-full flex items-end pl-20 sm:pl-5 lg:pl-0">
              <img src="assets/images/why_trade.png" alt="Imgae" />
            </div>
          </div>
          <div className="col-lg-6 col-xxl-7">
            <div className="row pt-120 pb-120">
              <div className="col-xxl-6 offset-xxl-2">
                <div className="why-trade__part">
                  <span className="heading fs-five">Why Vote </span>
                  <h3 className="mb-3 mt-5">Candidate (EC)</h3>
                  <p>
                    Voting is a fundamental civic duty that empowers individuals
                    to influence government decisions and policies.
                  </p>
                  <Link
                    href="/approved-voters"
                    className="cmn-btn link secondary-link fs-six-up  gap-2 gap-lg-3 items-center mt-5"
                  >
                    {" "}
                    Check Voters{" "}
                    <i className="ti ti-arrow-narrow-right fs-four"></i>
                  </Link>
                </div>
              </div>
              <div className="col-xxl-12 mt-7 mt-md-8 mt-xxl-3">
                <div className="why-trade__part flex items-center">
                  <div className="vector hidden d-xxl-flex px-xxl-15">
                    <img
                      src="assets/images/trade_vector.png"
                      alt="Image"
                      className="max-xxl-un"
                    />
                  </div>
                  <div className="content">
                    <h3 className="mb-3">Power of Your Vote</h3>
                    <p>
                      By casting your vote, you contribute to the democratic
                      process, ensuring that your voice and the collective will
                      of the people are heard.
                    </p>
                    <Link
                      href="/approved-candidates"
                      className="cmn-btn link secondary-link fs-six-up  gap-2 gap-lg-3 items-center mt-5"
                    >
                      {" "}
                      Check Candidates{" "}
                      <i className="ti ti-arrow-narrow-right fs-four"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVote;
