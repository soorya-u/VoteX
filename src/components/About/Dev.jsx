import Link from "next/link";

export default function Dev({ name, description, imageUrl, links }) {
  return (
    <div className="sm:flex-[0_0_auto] sm:w-1/2 lg:flex-[0_0_auto] lg:w-1/3 2xl:flex-[0_0_auto] 2xl:w-1/4">
      <div className="team__card group bg-[#1f1f1f] overflow-hidden">
        <div className="relative">
          <img src={imageUrl} alt="Image" className="w-full" />
        </div>
        <div className="team__content pseudo_element_after transition text-center py-6 py-lg-7 py-xxl-8 px-4 px-lg-5 px-xxl-6">
          <Link href="/">
            <h5 className="team__title transition-all ease-out duration-500 flex justify-center items-center pb-4 mb-4 relative z-0 after:content-[''] after:absolute after:-z-[1]">
              {name}
            </h5>
          </Link>
          <p className="transition-all ease-out duration-500 mb-3">
            {description}
          </p>
          <div className="size-[40px] min-w-[40px] lg:size-[40px] lg:min-w-[40px] bg-black hover:bg-[#fff6e9] group">
            <ul className="flex items-center justify-center gap-2 md:gap-3">
              <SocialBar links={links} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const SocialBar = ({ links }) => {
  const keys = Object.keys(links);
  const values = Object.values(links);
  return (
    <>
      {keys.map((key, idx) => (
        <SocialLink link={values[idx]} name={key} key={idx} />
      ))}
    </>
  );
};

const SocialLink = ({ name, link }) => {
  const cn = name === "web" ? "world" : `brand-${name}`;
  const style = !link ? { color: "gray", cursor: "default" } : {};
  return (
    <li>
      <Link
        className="flex justify-center items-center text-[20px] lg:text-[24px]"
        href={link || ""}
        target="_blank"
      >
        <i style={style} className={`ti ti-${cn}`} />
      </Link>
    </li>
  );
};
