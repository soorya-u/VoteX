import Dev from "./Dev";

import { devsInfo } from "@/constants/devs";

const Team = () => {
  return (
    <section className="team py-[50px] sm:py-[60px] lg:py-[120px] 2xl:pt-0 bg-black relative z-0">
      <div className="absolute top-0 left-0 size-full -z-[1]">
        <img
          src="assets/images/vector.png"
          alt="vector"
          className="absolute left-[150px] top-[111px] w-[6%] animate-jello none lg:flex pt-10 2xl:pt-0"
        />
      </div>
      <div className="w-full px-3 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem]">
          <div className="text-center mb-10 lg:mb-15 ">
            <span className="font-open-sans text-[#fff6e9] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500 text-[18px] lg:text-[20px] mb-5">
              Team
            </span>
            <h3>Our Team</h3>
            <p className="mt-5 2xl:mt-6 max-w-[60ch] mx-auto">
              Innovative{" "}
              <span className="font-bold text-[#f73859]">Block and Defeat</span>{" "}
              pushing tech limits with creativity and camaraderie.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-[0.75rem] [&>*]:flex-shrink-0 [&>*]:w-full [&>*]:max-w-full [&>*]:mx-[0.75rem]">
          {devsInfo.map((d, idx) => (
            <Dev
              name={d.name}
              description={d.description}
              imageUrl={d.imageUrl}
              links={d.links}
              key={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
