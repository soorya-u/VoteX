import Link from "next/link";

export default function Dev({ name, description, imageUrl, links }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xxl-3">
      <div className="team__card nb3-bg cus-rounded-1 overflow-hidden">
        <div className="team__thumbs relative">
          <img src={imageUrl} alt="Image" className="w-full" />
        </div>
        <div className="team__content pseudo_element_after transition text-center py-6 py-lg-7 py-xxl-8 px-4 px-lg-5 px-xxl-6">
          <Link href="/">
            <h5 className="team__title flex justify-center items-center pb-4 mb-4 pseudo_element_after">
              {name}
            </h5>
          </Link>
          <p className="mb-3">{description}</p>
          <div className="social-area alt">
            <ul className="flex items-center justify-center gap-2 gap-md-3">
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
      <Link className="flex justify-center items-center fs-four" href={link || ""} target="_blank">
        <i style={style} className={`ti ti-${cn}`} />
      </Link>
    </li>
  );
};
