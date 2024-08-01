import Dev from "./Dev";

import { devsInfo } from "@/constants/devs";

const Team = () => {
  return (
    <section className="team pb-120 pt-120 pt-xxl-0 a2-bg position-relative z-0">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
        {
          //  animate done
          <img
            src="assets/images/vector.png"
            alt="vector"
            className="position-absolute animate-jello d-none d-lg-flex top-0 pt-10 pt-xxl-0 "
          />
        }
      </div>
      <div className="container">
        <div className="row">
          <div className="heading__content text-center mb-10 mb-lg-15 ">
            <span className="font-open-sans text-[#fff6e9] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500  text-[18px] lg:text-[20px] mb-5">
              Team
            </span>
            <h3>Our Team</h3>
            <p className="mt-5 mt-xxl-6 mx-ch mx-auto">
              Innovative{" "}
              <span className="font-bold text-[#f73859]">Block and Defeat</span>{" "}
              pushing tech limits with creativity and camaraderie.
            </p>
          </div>
        </div>
        <div className="row gy-6">
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
