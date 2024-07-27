"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useVotingDapp } from "@/hooks/use-voting-dapp";
import { notifyError, notifySuccess } from "@/lib/toast";

import { Cursor, Preloader, ScrollToTop } from "@/components";
import Input from "@/components/Global/Input";
import Upload from "@/components/Global/Upload";
import Preview from "@/components/Global/Preview";
import UploadImg from "@/components/Global/UploadImg";
import PreviewImg from "@/components/Global/PreviewImg";
import Loader from "@/components/Global/Loader";
import PopUp from "@/components/Global/PopUp";

export default function CandidatePage() {
  const {
    loader,
    setLoader,
    registerCandidate,
    getSingleCandidate,
    publicKey,
  } = useVotingDapp();

  const [candidate, setCandidate] = useState();
  const [loading, setLoading] = useState(false);

  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);

  const [updateCandidate, setUpdateCandidate] = useState({
    _name: "",
    _nominationForm: "",
    _affidavit: "",
    _criminalAntecedents: "",
    _assetsAndLiabilities: "",
    _educationalQualifications: "",
    _electoralRollEntry: "",
    _securityDeposit: "",
    _partyAffiliation: "",
    _oathOrAffirmation: "",
    _photographs: "",
    _proofOfAge: "",
    _proofOfAddress: "",
    _panCardDetails: "",
    _voterIdCardDetails: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!publicKey) return;
      const items = await getSingleCandidate(publicKey);
      setCandidate(items);
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <section className="sign nb4-bg h-100 d-flex align-items-center position-relative z-0">
        <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
          <img
            src="assets/images/star.png"
            alt="vector"
            className="position-absolute push_animat"
          />
        </div>
        <div className="container ">
          <div className="row align-items-center justify-content-center justify-content-xl-start">
            <div className="col-12 col-sm-10 col-md-6">
              <div className="welcome alt-color text-center text-md-start pt-120 pb-120 position-relative z-0">
                <h1 className="display-one">Welcome Back!</h1>
                {image && <PreviewImg image={image} />}
                {pdf && <Preview pdf={pdf} />}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5 col-xxl-5 offset-xxl-1 text-center ms-xl-auto">
              <div className="sign__content ms-md-5 ms-xxl-0 pt-120 pb-120">
                <div className="head_part">
                  <Link
                    href="/"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start",
                      gap: 16,
                    }}
                  >
                    <img
                      style={{
                        width: "3.2rem",
                        height: "3.2rem",
                      }}
                      src="/logo.png"
                      className="logo"
                      alt="logo"
                    />
                    <h1
                      style={{
                        fontSize: "3.5rem",
                        fontFamily: "Tiny5",
                        fontWeight: 400,
                        fontStyle: "normal",
                      }}
                    >
                      DemocraChain
                    </h1>
                  </Link>
                  <h5 className="mt-5 mt-lg-6">Register as a candidate</h5>
                </div>
                {candidate && candidate?.address === "" && (
                  <div
                    autoComplete="off"
                    id="frmContactus"
                    className="contact__form mt-8 mt-lg-10  text-start"
                  >
                    <div className="d-flex flex-column gap-5 gap-lg-6 ">
                      <div className="row g-5 g-lg-6">
                        <div className="col-sm-6 col-md-12 col-xl-6">
                          <Input
                            name={"Name"}
                            placeholder={"Name"}
                            type={"text"}
                            handleClick={(e) =>
                              setUpdateCandidate({
                                ...updateCandidate,
                                _name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-sm-6 col-md-12 col-xl-6">
                          <Input
                            name={"Nomination Form"}
                            placeholder={"Nomination Form"}
                            type={"text"}
                            handleClick={(e) =>
                              setUpdateCandidate({
                                ...updateCandidate,
                                _nominationForm: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <Input
                        name={"Affidavit"}
                        placeholder={"Affidavit"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _affidavit: e.target.value,
                          })
                        }
                      />

                      <Input
                        name={"Criminal Antecedents"}
                        placeholder={"Criminal Antecedents"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _criminalAntecedents: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Assets And Liabilities"}
                        placeholder={"Assets And Liabilities"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _assetsAndLiabilities: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Educational Qualifications"}
                        placeholder={"Educational Qualifications"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _educationalQualifications: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Electoral Roll Entry"}
                        placeholder={"Electoral Roll Entry"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _electoralRollEntry: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Security Deposit"}
                        placeholder={"Security Deposit"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _securityDeposit: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Party Affiliation"}
                        placeholder={"Party Affiliation"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _partyAffiliation: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Oath Or Affirmation"}
                        placeholder={"Oath Or Affirmation"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _oathOrAffirmation: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Photographs"}
                        placeholder={"Photographs"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _photographs: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Proof Of Age"}
                        placeholder={"Proof Of Age"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _proofOfAge: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Proof Of Address"}
                        placeholder={"Proof Of Address"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _proofOfAddress: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"Pan Card Details"}
                        placeholder={"Pan Card Details"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _panCardDetails: e.target.value,
                          })
                        }
                      />
                      <Input
                        name={"VoterIdCardDetails"}
                        placeholder={"Voter Id Card etails"}
                        type={"text"}
                        handleClick={(e) =>
                          setUpdateCandidate({
                            ...updateCandidate,
                            _voterIdCardDetails: e.target.value,
                          })
                        }
                      />
                      <UploadImg
                        setLoader={setLoader}
                        notifySuccess={notifySuccess}
                        notifyError={notifyError}
                        setImage={setImage}
                      />
                      <Upload
                        setLoader={setLoader}
                        notifySuccess={notifySuccess}
                        notifyError={notifyError}
                        setPdf={setPdf}
                      />
                    </div>
                    <label className="checkbox-single d-flex align-items-center nw1-color mt-3">
                      <span className="checkbox-area d-center">
                        <input type="checkbox" />
                        <span className="checkmark d-center"></span>
                      </span>
                      I accept the privacy policy
                    </label>
                    <div className=" mt-7 mt-lg-8">
                      <button
                        onClick={async () =>
                          await registerCandidate(updateCandidate, image, pdf)
                        }
                        className="cmn-btn py-3 px-5 px-lg-6 mt-7 mt-lg-8 w-100 d-center"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 mt-lg-10">
                  <p>
                    Before registering kindly check the nomination details{" "}
                    <Link href="/">here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {candidate && candidate.address !== "" && (
          <PopUp candidate={candidate} />
        )}
        {loader && <Loader />}
      </section>
    </>
  );
}
