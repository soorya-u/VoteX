import Link from "next/link";

const Company = () => {
  return (
    <section className="relative z-0 py-[50px] sm:py-[60px] lg:py-[120px]">
      <div className="absolute w-full h-full -z-[1]">
        <img
          src="assets/images/star3.png"
          alt="vector"
          className="w-[15%] absolute top-0 right-0 pt-10 pr-20 mr-20 hidden 2xl:flex animate-preview-skew"
        />
      </div>
      <div className="w-full px-3 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem] justify-center items-center">
          <div className="sm:flex-[0_0_auto] sm:w-5/6 lg:flex-[0_0_auto] lg:w-1/2 2xl:flex-[0_0_auto] 2xl:w-5/12 order-2 lg:order-[0]">
            <div className="flex justify-center items-center">
              <img
                src="assets/images/faq.png"
                className="max-h-[300px] object-cover w-full"
                alt="Imgae"
              />
            </div>
          </div>
          <div className="lg:flex-[0_0_auto] lg:w-1/2 2xl:flex-[0_0_auto] 2xl:w-7/12">
            <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem] xl:ml-3 2xl:ml-10">
              <div className="2xl:flex-[0_0_auto] 2xl:w-1/2">
                <div>
                  <span className="font-open-sans font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 text-[#fff6e9] text-[18px] lg:text-[20px]">
                    Our Team Story
                  </span>
                  <h3 className="mb-3 mt-5">Who We Are</h3>
                  <p>
                    We are a team of four passionate developers with a keen
                    interest in blockchain technology.
                  </p>
                </div>
              </div>
              <div className="2xl:flex-[0_0_auto] 2xl:w-full mt-8 md:mt-10 2xl:mt-13">
                <div className="flex sm:items-center flex-col sm:flex-row">
                  <div className="btn-area mt-8 sm:mt-0 mr-2 md:mr-6 2xl:mr-10 order-2 sm:order-[0]">
                    <Link
                      className="common-btn size-[100px] min-w-[100px] lg:size-[146px] lg:min-w-[146px] bg-[#fff6e9] rounded-[50%] flex justify-center items-center flex-col font-medium"
                      href="/"
                    >
                      <i className="ti ti-arrow-up-right text-[24px] lg:text-[32px]" />
                      Start Now
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-3">What We Do</h3>
                    <p>
                      Our team,{"  "}
                      <span className="font-bold text-[#f73859]">
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
