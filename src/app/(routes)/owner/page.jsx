"use client";

import { useState } from "react";
import Link from "next/link";

import { useContract } from "@/hooks/use-contract";
import { ownerPublicKey } from "@/constants/contract";

import Input from "@/components/Global/Input";
import Loader from "@/components/Global/Loader";

export default function OwnerPage() {
  const {
    loader,
    changeOwner: changeOwnerFn,
    resetContract,
    setVotingPeriod,
    publicKey,
  } = useContract();

  const [voteTime, setVoteTime] = useState({
    startTime: "",
    endTime: "",
  });

  const [changeOwner, setChangeOwner] = useState("");

  return (
    <section className="sign nb4-bg h-100 d-flex align-items-center position-relative z-0">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
        {
          // tw done
          <img
            src="assets/images/star.png"
            alt="vector"
            className="absolute animate-push"
          />
        }
      </div>
      <div className="container ">
        <div className="row align-items-center justify-content-center justify-content-xl-start">
          <div className="col-12 col-sm-10 col-md-6">
            <div className="welcome alt-color text-center text-md-start pt-120 pb-120 position-relative z-0">
              <h1 className="text-[56px] sm:text-[68px] lg:text-[85px] xl:text-[100px] font-open-sans text-[#fefefe] font-bold p-0 m-0 leading-[120%] block transition-all ease-out duration-500">
                Welcome Admin!
              </h1>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5 col-xxl-5 offset-xxl-1 text-center ms-xl-auto mx-auto">
            <div className="sign__content ms-md-5 ms-xxl-0 pt-120 pb-120">
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
                <h5 className="mt-5 mt-lg-6">Import Contract Functions </h5>
              </div>

              {publicKey === ownerPublicKey && (
                <div
                  autoComplete="off"
                  id="frmContactus"
                  className="contact__form mt-8 mt-lg-10 text-start"
                >
                  <div className="d-flex flex-column gap-5 gap-lg-6 ">
                    <Input
                      name={"Start Time"}
                      placeholder={"startTime"}
                      type={"date"}
                      handleClick={(e) =>
                        setVoteTime({
                          ...voteTime,
                          startTime: e.target.value,
                        })
                      }
                    />
                    <Input
                      name={"End Time"}
                      placeholder={"endTime"}
                      type={"date"}
                      handleClick={(e) =>
                        setVoteTime({
                          ...voteTime,
                          endTime: e.target.value,
                        })
                      }
                    />
                    <div>
                      <button
                        className="cmn-btn py-3 px-5 px-lg-6 w-100 d-center"
                        onClick={async () => await setVotingPeriod(voteTime)}
                      >
                        Set Voting Period
                      </button>
                    </div>
                    <div className="mt-lg-8"></div>
                    <Input
                      name={"New Address"}
                      placeholder={"new address"}
                      type={"text"}
                      handleClick={(e) => setChangeOwner(e.target.value)}
                    />
                    <div>
                      <button
                        className="cmn-btn py-3 px-5 px-lg-6 w-100 d-center"
                        onClick={async () => await changeOwnerFn(changeOwner)}
                      >
                        Change Owner
                      </button>
                    </div>
                  </div>

                  <div className=" mt-7 mt-lg-16">
                    <button
                      className="cmn-btn py-3 px-5 px-lg-6 mt-7 mt-lg-8 w-100 d-center"
                      onClick={async () => await resetContract()}
                    >
                      Reset Contract
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {loader && <Loader />}
    </section>
  );
}
