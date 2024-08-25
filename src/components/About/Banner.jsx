import Link from "next/link";

const Banner = () => {
  return (
    <section className="banner-section  pt-120 pb-120">
      <div className="container mt-lg-0 pt-18 pt-xl-20">
        <div className="row">
          <div className="col-12 breadcrumb-area ">
            <h2 className="mb-4">About Us</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <i className="ti ti-angle-double-right" />
                </li>
                <li
                  className="breadcrumb-item ml-2 pl-7 active"
                  aria-current="page"
                >
                  <span>About Us</span>
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
