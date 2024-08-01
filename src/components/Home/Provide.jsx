const Provide = () => {
  return (
    <section className="provide-world bg nb4-bg pt-120 pb-120  position-relative z-0">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1 d-none d-md-flex">
        {
          //  added
          <img
            src="assets/images/vector.png"
            alt="vector"
            style={{ paddingLeft: "10rem" }}
            className="position-absolute pt-6 ml-8 pt-xl-15 animate-preview-shape-rev-x"
          />
        }
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xxl-7">
            <div className="heading__content mb-10 mb-lg-15 text-center">
              <span className=" font-open-sans text-[#f73859] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 text-[18px] lg:text-[20px] mb-5">
                We Provide World&apos;s
              </span>
              <h3 className="mb-5 mb-lg-6">
                Decentralized voting community{" "}
                <span className="text-[#f73859]"></span> Voters
              </h3>
              <p className="fs-six-up mx-ch mx-auto">
                Voting is a fundamental duty as a citizen of nation.
              </p>
            </div>
          </div>
        </div>
        <div className="row gy-6 gy-xxl-0">
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-award-filled fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">At Best Reputation</h4>
              <p>
                At Best Reputation, we enhance your online presence with
                integrity and excellence. Trust our expert team to build and
                maintain your brand&apos;s credibility, ensuring you shine in
                the digital world.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-users fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">Welcome to Democrochain </h4>
              <p>
                Join millions in shaping our nation&apos;s future by casting
                your vote. Every vote counts—be informed, get involved, and make
                a difference. Vote responsibly!
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-shield-check-filled fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">Trusted and Secure</h4>
              <p>
                At Trusted and Secure, your safety is our priority. We offer
                robust solutions to protect your data and ensure secure
                transactions. Choose us for peace of mind in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provide;
