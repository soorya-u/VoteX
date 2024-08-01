import Link from "next/link";

const HeroSection = ({ initialData, highest }) => {
  const motto = "Vote Loud, Vote Proud ";

  return (
    <section className="bg-hero-bg-vector bg-[#141414] bg-no-repeat bg-center bg-cover lg:after:content-[''] lg:after:absolute lg:after:size-[539px] lg:after:rounded-[539px] lg:after:opacity-35 lg:after:blur-[200px] lg:after:top-[12%] lg:after:right-[6%] lg:after:-z-[1] 2xl:after:top-[18%] 2xl:after:right-[12%] 2xl:before:content-[''] 2xl:before:absolute 2xl:before:top-0 2xl:before:left-0 2xl:before:w-[45%] 2xl:before:h-full 2xl:before:bg-[#fff6e9] 2xl:before:-z-[1] relative z-0">
      <div className="absolute top-0 left-0 w-full h-full -z-[1]">
        <img
          src="assets/images/hero_vector.png"
          alt="vector"
          className="absolute none xl:flex bottom-0 right-0 animate-preview-shape-rev-x"
        />
      </div>
      <div className="container pt-20 mt-12 mt-lg-20">
        <div className="row pt-4 pt-lg-10 gy-12 gy-lg-0 justify-content-center justify-content-lg-between align-items-center">
          <div className="col-lg-6 col-xxl-7">
            <div className="hero-card p1-xxl-bg pt-xl-20 pb-xl-20 position-relative">
              <div className="pt-xxl-10 pb-xxl-10">
                <div className="circle-text first d-center cus-z1 position-absolute end-0 top-0 d-none d-xxl-flex  me-lg-10 mt-lg-10">
                  <div className="text d-center">
                    <p className="text-[14px] lg:text-[16px]">
                      {motto.split("").map((l, idx) => (
                        <span
                          key={idx}
                          style={{
                            transform: `rotate(${
                              (idx * 360) / motto.length
                            }deg)`,
                          }}
                        >
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>

                  <img
                    src="assets/images/circle_star.png"
                    alt="star"
                    className="animate-push"
                  />
                </div>
                <span className="font-open-sans text-[#fefefe] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 2xl:text-[#fff6e9] text-[18px] lg:text-[20px] mb-3">
                  Decentralized Voting
                </span>
                <h1 className="text-[56px] sm:text-[68px] lg:text-[85px] xl:text-[100px] font-open-sans text-[#fefefe] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 2xl:text-[#141414] mb-5 lg:mb-6">
                  Vote For your Favorite Candidate
                </h1>
                <p className="text-[16px] lg:text-[18px] font-[500] 2xl:text-[#141414]">
                  Now you can elect your Candidate through the decentralized
                  voting system
                </p>
                {initialData &&
                  initialData?.startDateN !== 0 &&
                  initialData?.endDateN !== 0 && (
                    <>
                      <span className="heading mt-3 p1-max-xxl 2xl:text-[#141414] text-[18px] lg:text-[20px] mb-3">
                        Starting: {initialData?.startDate}
                      </span>
                      <span className="heading p1-max-xxl 2xl:text-[#141414] text-[18px] lg:text-[20px] mb-3">
                        Ending: {initialData?.endDate}
                      </span>
                    </>
                  )}

                <div className="inline-flex flex-wrap gap-4 lg:gap-10 items-center mt-8 lg:mt-10">
                  <Link
                    href="/approved-candidates"
                    className="cmn-btn alt-xxl-bg text-[18px] lg:text-[20px] nb4-xxl-bg gap-2 lg:gap-3 items-center py-2 px-5 lg:py-3 lg:px-6"
                  >
                    All Candidates <i className="ti ti-trending-up"></i>
                  </Link>
                  {highest ? (
                    <Link
                      href={{
                        pathname: "/candidate-details",
                        query: { address: highest?.address },
                      }}
                      className="cmn-btn link link-xxl-color fs-five  gap-2 gap-lg-3 align-items-center "
                    >
                      <i className="ti ti-arrow-narrow-right fs-four"></i>
                      Current Highest Voter
                    </Link>
                  ) : (
                    <Link
                      href="/all-voters"
                      className="cmn-btn link link-xxl-color fs-five  gap-2 gap-lg-3 align-items-center "
                    >
                      <i className="ti ti-arrow-narrow-right fs-four" />
                      All Voters
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10 col-lg-6 col-xxl-5">
            <div className="hero-section__thumbs pb-xxl-10">
              <img
                src="assets/images/hero-image.png"
                className="max-auto max-xxl-un"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
