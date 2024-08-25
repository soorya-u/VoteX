import Link from "next/link";

const Vote = () => {
  return (
    <section className="trade_on a2-bg pt-120 pb-120 relative z-0">
      <div className="animation absolute top-0 left-0 w-full h-full -z-[1]">
        <img
          src="assets/images/coin.png"
          alt="vector"
          className="absolute hidden d-md-flex previewShapeRevX"
        />
        <img
          src="assets/images/star2.png"
          alt="vector"
          className="absolute hidden d-xl-flex push_animat"
        />
        <img
          src="assets/images/coin_vector.png"
          alt="vector"
          className="absolute hidden d-xxxl-flex bottom-0 end-0 previewShapeRevX opacity-50"
        />
      </div>
      <div className="container">
        <div className="row gy-10 gy-xxl-0 justify-center justify-content-xxl-between items-center">
          <div className="col-lg-6 col-xxl-5">
            <div className="trade_on__content">
              <span className="heading s1-color fs-five mb-5">
                Vote Through Democrochain
              </span>
              <p className="fs-six mx-ch">
                Voting in our blockchain DApp ensures transparency, security,
                and fairness in the election process. By leveraging blockchain
                technology, we provide a tamper-proof system where every vote is
                securely recorded and easily verifiable. Empower yourself and
                contribute to a more trustworthy electoral system by casting
                your vote in our innovative DApp.
              </p>
              <ul className="flex gap-4 flex-col mt-6">
                <li className="flex items-center gap-3 fs-six-up">
                  <i className="ti ti-circle-check s1-color fs-four"></i>
                  Decentralized
                </li>
                <li className="flex items-center gap-3 fs-six-up">
                  <i className="ti ti-circle-check s1-color fs-four"></i>
                  Transparent{" "}
                </li>
                <li className="flex items-center gap-3 fs-six-up">
                  <i className="ti ti-circle-check s1-color fs-four"></i>Risk
                  Secure{" "}
                </li>
                <li className="flex items-center gap-3 fs-six-up">
                  <i className="ti ti-circle-check s1-color fs-four"></i>
                  Trustworthy{" "}
                </li>
                <li className="flex items-center gap-3 fs-six-up">
                  <i className="ti ti-circle-check s1-color fs-four"></i>
                  Anti-Hack{" "}
                </li>
              </ul>
              <Link
                href="/"
                className="cmn-btn secondary-alt fs-six-up nb4-xxl-bg gap-2 gap-lg-3 items-center py-2 px-5 py-lg-3 px-lg-6 mt-7 mt-xxl-8"
              >
                Sign up Now <i className="ti ti-arrow-right fs-four"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-8 col-lg-6">
            <div className="trade_on__thumbs flex justify-content-end">
              <img src="assets/images/trade_on.png" alt="Imgae" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vote;
