const Mission = () => {
  return (
    <section className="provide-world our_mission     hidden 2xl:block after:content-[''] after:absolute after:bottom-0 after:left-0 after:bg-black after:h-[38%] after:w-full after:-z-[2] after:hidden 2xl:after:block py-[50px] sm:py-[60px] lg:py-[120px] relative z-0">
      <div className="absolute top-0 left-0 size-full -z-[1]">
        <img
          src="assets/images/vector8.png"
          alt="vector"
          className="w-[15%] absolute bottom-0 pt-6 xl:pt-15 none lg:flex animate-push right-[12%] 3xl:right-[7%]"
        />
      </div>
      <div className=" w-full px-3 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem] justify-between items-center mb-10 lg:mb-15">
          <div className="xl:flex-[0_0_auto] xl:w-5/12">
            <span className="font-open-sans text-[#f73859] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 text-[18px] lg:text-[20px] mb-5">
              Our Mission
            </span>
            <h3>Empowering Success How We&apos;re Making a Difference</h3>
          </div>
          <div className="xl:flex-[0_0_auto] xl:w-1/3">
            <p className="text-[16px] lg:text-[18px] max-w-[60ch] xl:text-end mt-3 xl:mt-0">
              we believe that success is not reserved for the privileged few.
              It&apos;s a journey that anyone can embark upon with right
              guidance
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem]">
          <div className="md:flex-[0_0_auto] md:w-1/2 2xl:flex-[0_0_auto] 2xl:w-1/3">
            <div className="group transition-all ease-out duration-500 group hover:bg-[#fff6e9] bg-[#1f1f1f] text-center py-5 lg:py-10 px-4 lg:px-9">
              <span className="size-[60px] min-w-[60px] lg:size-[80px] lg:min-w-[80px] flex justify-center items-center bg-[#141414] p-4 rounded-[50%] mx-auto">
                <i className="ti ti-users text-[24px] lg:text-[32px] text-[#fff6e9]" />
              </span>
              <h4 className="transition-all ease-out duration-500 group-hover:text-[#141414] mt-5 mb-5">
                Client-first approach
              </h4>
              <p className="transition-all ease-out duration-500 group-hover:text-[#141414]">
                Transformed the voting landscape. By leveraging blockchain
                technology, our app has made it easier than ever for individuals
                to securely and transparently participate in voting processes
                from anywhere.
              </p>
            </div>
          </div>
          <div className="md:flex-[0_0_auto] md:w-1/2 2xl:flex-[0_0_auto] 2xl:w-1/3">
            <div className="transition-all ease-out duration-500 group hover:bg-[#fff6e9] bg-[1f1f1f] text-center py-5 lg:py-10 px-4 lg:px-9">
              <span className="size-[60px] min-w-[60px] lg:size-[80px] lg:min-w-[80px] flex justify-center items-center bg-[#141414] p-4 rounded-[50%] mx-auto">
                <i className="ti ti-shield text-[24px] lg:text-[32px] text-[#fff6e9]" />
              </span>
              <h4 className="my-5 transition-all ease-out duration-500 group-hover:text-[#141414]">
                Integrity and Compliance
              </h4>
              <p className="transition-all ease-out duration-500 group-hover:text-[#141414]">
                One of the fundamental principles of voting is security and
                transparency. Successful voting systems ensure that each vote is
                accurately recorded and counted, providing voters with
                confidence in the electoral process.
              </p>
            </div>
          </div>
          <div className="md:flex-[0_0_auto] md:w-1/2 2xl:flex-[0_0_auto] 2xl:w-1/3">
            <div className="provide-world__card transition-all ease-out duration-500 group hover:bg-[#fff6e9] bg-[#1f1f1f] text-center py-5 lg:py-10 px-4 lg:px-9">
              <span className="size-[60px] min-w-[60px] lg:size-[80px] lg:min-w-[80px] flex justify-center items-center bg-[#141414] p-4 rounded-[50%] mx-auto">
                <i className="ti ti-bolt text-[24px] lg:text-[32px] text-[#fff6e9]" />
              </span>
              <h4 className="my-5 transition-all ease-out duration-500 group-hover:text-[#141414]">
                Fast Execution
              </h4>
              <p className="transition-all ease-out duration-500 group-hover:text-[#141414]">
                Voting is not without its challenges, as ensuring the security
                and integrity of the process can be complex and demanding. It
                requires rigorous measures to prevent fraud and ensure
                transparency, fostering trust and participation among voters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
