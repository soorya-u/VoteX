import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer position-relative pt-15 pt-lg-0 z-0 ">
      <div className="container">
        <div className="row">
          <div className="col-12 border-top border-color opac-20 py-7 py-xxl-8">
            <div className="footer__copyright d-center gap-15 flex-wrap justify-content-md-between">
              <p className="fs-six order-2 order-md-0 text-center text-md-start">
                The source code is available on{" "}
                <Link
                  href="https://github.com/soorya-u/DemocraChain"
                  className="underline text-link"
                >
                  GitHub
                </Link>
                .
              </p>
              <ul className="social-area d-center gap-2 gap-md-3">
                <li>
                  <Link href="/" className="d-center fs-four">
                    <i className="ti ti-brand-facebook" />
                  </Link>
                </li>
                <li>
                  <Link href="/" className="d-center fs-four">
                    <i className="ti ti-brand-twitch" />
                  </Link>
                </li>
                <li>
                  <Link href="/" className="d-center fs-four">
                    <i className="ti ti-brand-instagram" />
                  </Link>
                </li>
                <li>
                  <Link href="/" className="d-center fs-four">
                    <i className="ti ti-brand-discord-filled" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
