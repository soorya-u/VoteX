"use client";

import { useState } from "react";
import Link from "next/link";

import { useContract } from "@/hooks/use-contract";
import { notifyError, notifySuccess } from "@/lib/toast";

import Input from "@/components/Global/Input";
import Upload from "@/components/Global/Upload";
import Preview from "@/components/Global/Preview";
import UploadImg from "@/components/Global/UploadImg";
import PreviewImg from "@/components/Global/PreviewImg";
import Loader from "@/components/Global/Loader";

export default function UpdateCandidatesPage() {
  const {
    loader,
    setLoader,
    updateCandidate: updateCandidateFn,
  } = useContract();

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

  return (
    <section className="sign nb4-bg h-100 d-flex align-items-center position-relative z-0">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 -z-[1]">
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
            <div className="ms-md-5 ms-xxl-0 pt-120 pb-120">
              <div className="head_part">
                <Link
                  className="flex justify-center items-start gap-4"
                  href="/"
                >
                  <img src="/logo.png" className="size-[3.2rem]" alt="logo" />
                  <h1 className="text-[3.5rem] font-tiny5 font-normal">
                    DemocraChain
                  </h1>
                </Link>
                <h5 className="mt-5 mt-lg-6">Update your Candidate Details</h5>
              </div>

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
                        placeholder={"_name"}
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
                        placeholder={"_nominationForm"}
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
                    placeholder={"_affidavit"}
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
                    placeholder={"_criminalAntecedents"}
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
                    placeholder={"_assetsAndLiabilities"}
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
                    placeholder={"_educationalQualifications"}
                    type={"text"}
                    handleClick={(e) =>
                      setUpdateCandidate({
                        ...updateCandidate,
                        _educationalQualifications: e.target.value,
                      })
                    }
                  />
                  <Input
                    name={"Electoral RollEntry"}
                    placeholder={"_electoralRollEntry"}
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
                    placeholder={"_securityDeposit"}
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
                    placeholder={"_partyAffiliation"}
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
                    placeholder={"_oathOrAffirmation"}
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
                    placeholder={"_photographs"}
                    type={"text"}
                    handleClick={(e) =>
                      setUpdateCandidate({
                        ...updateCandidate,
                        _photographs: e.target.value,
                      })
                    }
                  />
                  <Input
                    name={"ProofOfAge"}
                    placeholder={"_proofOfAge"}
                    type={"text"}
                    handleClick={(e) =>
                      setUpdateCandidate({
                        ...updateCandidate,
                        _proofOfAge: e.target.value,
                      })
                    }
                  />
                  <Input
                    name={"ProofOfAddress"}
                    placeholder={"_proofOfAddress"}
                    type={"text"}
                    handleClick={(e) =>
                      setUpdateCandidate({
                        ...updateCandidate,
                        _proofOfAddress: e.target.value,
                      })
                    }
                  />
                  <Input
                    name={"PanCardDetails"}
                    placeholder={"_panCardDetails"}
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
                    placeholder={"_voterIdCardDetails"}
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
                      await updateCandidateFn(updateCandidate, image, pdf)
                    }
                    className="cmn-btn py-3 px-5 px-lg-6 mt-7 mt-lg-8 w-100 d-center"
                  >
                    Update
                  </button>
                </div>
              </div>

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
      {loader && <Loader />}
    </section>
  );
}
