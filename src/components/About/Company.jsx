import Link from "next/link";

const Company = () => {
  return (
    <section className="company-story relative z-0  pt-120 pb-120 ">
      <div className="animation absolute w-full h-full -z-[1]">
        <img
          src="assets/images/star3.png"
          alt="vector"
          className="absolute top-0 end-0 pt-10 pr-20 mr-20 hidden d-xxl-flex previewSkew"
        />
      </div>
      <div className="container">
        <div className="row gy-15 gy-lg-0 justify-center items-center">
          <div className="col-sm-10 col-lg-6 col-xxl-5 order-2 order-lg-0">
            <div className="company-story__thumbs flex justify-center items-center">
              <img
                src="assets/images/faq.png"
                className="cus-rounded-1 w-full"
                alt="Imgae"
              />
            </div>
          </div>
          <div className="col-lg-6 col-xxl-7">
            <div className="row xl:ml-3 2xl:ml-10">
              <div className="col-xxl-6">
                <div className="company-story__part">
                  <span className="heading p1-color fs-five">
                    Our Team Story
                  </span>
                  <h3 className="mb-3 mt-5">Who We Are</h3>
                  <p>
                    We are a team of four passionate developers with a keen
                    interest in blockchain technology.
                  </p>
                </div>
              </div>
              <div className="col-xxl-12 mt-8 mt-md-10 mt-xxl-13">
                <div className="company-story__part flex align-items-sm-center flex-col flex-sm-row">
                  <div className="btn-area mt-8 mt-sm-0 mr-2 sm:mr-6 2xl:mr-10 order-2 order-sm-0">
                    <Link
                      className="cmn-btn cmn-btn-circle flex justify-center items-center flex-col fw_500"
                      href="/"
                    >
                      <i className="ti ti-arrow-up-right fs-three" />
                      Start Now
                    </Link>
                  </div>
                  <div className="content">
                    <h3 className="mb-3">What We Do</h3>
                    <p>
                      Our team,{"  "}
                      <span className="font-bold text-secondary">
                        Block and Defeat
                      </span>{" "}
                      started with a passion for tech and a knack for chaos.
                      From late-night coding to wild brainstorming sessions, we
                      blend genius with a touch of madness to create
                      groundbreaking solutions—and have a lot of fun doing it!
                    </p>
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

export default Company;
