import { useEffect, useState } from "react";
import Link from "next/link";

import { useVotingDapp } from "@/hooks/use-contract";
import { useWindowDimension } from "@/hooks/use-window-dimension";
import { ownerPublicKey } from "@/constants/contract";
import { noSSR } from "next/dynamic";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { connectWallet, publicKey } = useVotingDapp();

  useEffect(() => {
    if (publicKey) setIsConnected(true);
  }, [publicKey]);

  return (
    <header className="header-section a2-bg-0 header-section--secondary header-menu w-100">
      <div className="container d-center">
        <nav className="navbar a2-lg-bg py-5 p-lg-5 rounded-3 navbar-expand-lg w-100 justify-content-between">
          <div className="d-flex align-items-center">
            <button
              onClick={() => setIsNavBarOpen((prev) => !prev)}
              className={`navbar-toggler ms-4 ${isNavBarOpen && "open"}`}
              type="button"
              data-bs-toggle="collapse"
              aria-label="Navbar Toggler"
              data-bs-target="#navbar-content"
              aria-expanded="true"
              id="nav-icon3"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <Link
              className="navbar-brand m-0 p-0 d-flex align-items-center gap-5 gap-xl-5 me-2"
              href="/"
            >
              <img
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
                src="/logo.png"
                className="logo small_logo d-sm-none"
                alt="logo"
              />
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
                className="d-none d-sm-flex"
              >
                <img
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                  src="/logo.png"
                  className="logo"
                  alt="logo"
                />
                <h1
                  style={{
                    fontSize: "2.1rem",
                    fontFamily: "Tiny5",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  DemocraChain
                </h1>
              </div>
            </Link>
          </div>
          <div className="nav_alt">
            <div className="right-area position-relative ms-0 d-center gap-1 gap-xl-4 d-lg-none">
              {isConnected ? (
                <>
                  <div className="single-item">
                    <Link
                      href="/voter"
                      className="rotate_eff flex-nowrap py-1 px-2 px-xl-3 d-center gap-1 fw-bold nw1-color"
                    >
                      Voter <i className="ti ti-arrow-right fs-six-up"></i>
                    </Link>
                  </div>
                  <div className="single-item">
                    <Link
                      href="/candidate"
                      className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                    >
                      Candidate{" "}
                      <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="single-item">
                  <button
                    onClick={async () =>
                      await connectWallet().then(() => setIsConnected(true))
                    }
                    className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                  >
                    Connect Wallet{" "}
                    <i className="ti ti-arrow-right fw-semibold fs-six-up"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            className={`collapse navbar-collapse justify-content-center ${
              isNavBarOpen && "show"
            }`}
            id="navbar-content"
          >
            <ul className="navbar-nav gap-2 gap-lg-3 gap-xxl-8 align-self-center mx-auto mt-4 mt-lg-0">
              <li className="dropdown show-dropdown">
                <Link
                  style={{ fontSize: 16 }}
                  href="/"
                  className="dropdown-nav header-hover-link"
                >
                  Home
                </Link>
              </li>
              <Dropdown btnName={"Candidate"}>
                <li>
                  <Link
                    href="/all-candidates"
                    className="dropdown-item header-hover-link"
                  >
                    All Candidates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/approved-candidates"
                    className="dropdown-item header-hover-link"
                  >
                    Approved Candidates
                  </Link>
                </li>
              </Dropdown>
              <Dropdown btnName={"Voter"}>
                <li>
                  <Link
                    href="/all-voters"
                    className="dropdown-item header-hover-link"
                  >
                    All Voters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/approved-voters"
                    className="dropdown-item header-hover-link"
                  >
                    Approved Voters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/voted-voters"
                    className="dropdown-item header-hover-link"
                  >
                    Voted Voters
                  </Link>
                </li>
              </Dropdown>
              {publicKey === ownerPublicKey && (
                <li>
                  <Link
                    href="/owner"
                    className="dropdown-item header-hover-link"
                  >
                    Owner
                  </Link>
                </li>
              )}
              <Dropdown btnName={"Resources"}>
                <li>
                  <Link
                    href="/about"
                    className="dropdown-item header-hover-link"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="dropdown-item header-hover-link"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmap"
                    className="dropdown-item header-hover-link"
                  >
                    Roadmap
                  </Link>
                </li>
              </Dropdown>
            </ul>
          </div>
          <div className="right-area position-relative ms-0 d-center gap-1 gap-xl-4 d-none d-lg-flex">
            {isConnected ? (
              <>
                <div className="single-item">
                  <Link
                    href="/voter"
                    className="rotate_eff flex-nowrap py-1 px-2 px-xl-3 d-center gap-1 fw-bold nw1-color"
                  >
                    Voter <i className="ti ti-arrow-right fs-six-up" />
                  </Link>
                </div>
                <div className="single-item">
                  <Link
                    href="/candidate"
                    className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                  >
                    Candidate{" "}
                    <i className="ti ti-arrow-right fw-semibold fs-six-up" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="single-item">
                <button
                  onClick={async () =>
                    await connectWallet().then(() => setIsConnected(true))
                  }
                  className="cmn-btn fw-bold py-2 px-2 px-sm-3 px-lg-4 align-items-center gap-1"
                >
                  Connect Wallet{" "}
                  <i className="ti ti-arrow-right fw-semibold fs-six-up" />
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

const Dropdown = ({ btnName, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { width } = useWindowDimension();
  return (
    <li className="dropdown show-dropdown">
      <button
        onClick={() => width <= 990 && setIsDropdownOpen((prev) => !prev)}
        type="button"
        aria-label="Navbar Dropdown Button"
        className="dropdown-nav header-hover-link"
      >
        {btnName}
      </button>
      <ul
        className="dropdown-menu"
        style={{ display: width > 990 || isDropdownOpen ? "block" : "none" }}
      >
        {children}
      </ul>
    </li>
  );
};

export default Header;
