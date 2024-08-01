import Link from "next/link";

const Banner = () => {
  return (
    <section className=" bg-banner bg-no-repeat bg-center bg-cover pt-[50px] sm:pt-[60px] lg:pt-[120px] pb-[50px] sm:pb-[60px] lg:pb-[120px]">
      <div className="w-full px-3 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] mt-10 lg:mt-0 pt-15 lg:pt-20 pb-5 lg:pb-0">
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem]">
          <div className="flex-[0_0_auto] w-full">
            <h2 className="mb-4">Contact</h2>
            <nav aria-label="breadcrumb">
              <ol className="gap-y-2 mb-0">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li
                  className="relative before:content-[''] before:font-['tabler-icons'] before:z-[1] before:absolute before:left-0 before:text-2xl text-[#fff6e9] ml-2 pl-7"
                  aria-current="page"
                >
                  <span className="text-[#fff6e9]">Contact</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
