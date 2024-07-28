import { useState } from "react";
import Link from "next/link";

import { useVotingDapp } from "@/hooks/use-contract";
import { ownerPublicKey } from "@/constants/contract";
import { shortenAddress } from "@/utils";

import Preview from "../Global/Preview";

const Details = ({
  candidate,
  path,
  giveVote,
  checkVote,
  handleClickApprove,
  handleClickReject,
  votingTime,
  currentVotingTime,
  user,
}) => {
  const [message, setMessage] = useState();
  const { publicKey } = useVotingDapp();

  return (
    <section className="team-details pt-120 pb-120 position-relative z-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-12 col-xxl-10">
            <div className="team-details__card d-center flex-column flex-md-row gap-6">
              <div className="team-details__thumbs">
                <img
                  src={candidate?.image}
                  alt="Image"
                  className="cus-rounded-1 max-auto max-lg-un"
                />
              </div>
              <div className="team__content pe-md-4">
                <h5 className="team__title mb-4">{candidate?._name}</h5>
                <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                  <li>
                    <strong>Address :&nbsp;&nbsp; </strong>{" "}
                    {shortenAddress(candidate?.address)}
                  </li>
                  <li>
                    <strong>Approval:&nbsp;&nbsp; </strong> {candidate?.status}
                  </li>
                  <li>
                    <strong>Register Id:&nbsp;&nbsp; </strong> #
                    {candidate?.registerId}
                  </li>
                  {path === "candidate" && (
                    <li>
                      <strong>Vote Count:&nbsp;&nbsp; </strong>{" "}
                      {candidate?.voteCount}
                    </li>
                  )}
                </ul>
                {path === "voter" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Address Details:&nbsp;&nbsp; </strong>{" "}
                      {candidate?._addressDetails}
                    </li>
                    <li>
                      <strong>Assembly Constituency :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._assemblyConstituencyNumberAndName}
                    </li>
                  </ul>
                )}

                {path === "candidate" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Affidavit:&nbsp;&nbsp; </strong>{" "}
                      {candidate?._affidavit}
                    </li>
                    <li>
                      <strong>Assets And Liabilities :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._assetsAndLiabilities}
                    </li>
                  </ul>
                )}

                {path === "voter" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Date of Birth / Age :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._dobOrAge}
                    </li>
                    <li>
                      <strong>Epic Number :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._epicNumber}
                    </li>
                  </ul>
                )}

                {path === "candidate" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Criminal Antecedents :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._criminalAntecedents}
                    </li>
                    <li>
                      <strong>Educational Qualifications :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._educationalQualifications}
                    </li>
                  </ul>
                )}

                {path === "voter" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Hologram And Barcode :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._hologramAndBarcode}
                    </li>
                    <li>
                      <strong>Gender :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._gender}
                    </li>
                  </ul>
                )}

                {path === "candidate" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Electoral Roll Entry :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._electoralRollEntry}
                    </li>
                    <li>
                      <strong>Nomination Form :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._nominationForm}
                    </li>
                  </ul>
                )}

                <p className="mb-4 mt-10">
                  <strong>Notice :</strong> {candidate?.message}
                </p>
                {candidate &&
                  publicKey === candidate.address &&
                  (candidate?.status === "Pending" ||
                    candidate?.status === "Rejected") && (
                    <div className="custom-actions mb-6">
                      <Link
                        href={
                          path === "candidate"
                            ? "/update-candidate"
                            : "/update-voter"
                        }
                        className="custom-read"
                      >
                        Update Profile{" "}
                      </Link>
                    </div>
                  )}

                {candidate &&
                publicKey === ownerPublicKey &&
                candidate.status === "Pending" ? (
                  <>
                    <div className="single-input">
                      <textarea
                        className="fs-six-up bg_transparent"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"message"}
                      />
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="custom-actions"
                    >
                      <a
                        className="custom-read"
                        onClick={async () =>
                          await handleClickApprove(candidate?.address, message)
                        }
                      >
                        Approve
                      </a>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="custom-actions"
                    >
                      <a
                        className="custom-read"
                        onClick={async () =>
                          await handleClickReject(candidate?.address, message)
                        }
                      >
                        Reject
                      </a>
                    </div>
                  </>
                ) : (
                  candidate &&
                  publicKey === ownerPublicKey &&
                  candidate.status === "Pending" && (
                    <>
                      <div className="single-input">
                        <textarea
                          className="fs-six-up bg_transparent"
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={"Message"}
                        />
                      </div>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={async () =>
                            await handleClickApprove(
                              candidate?.address,
                              message
                            )
                          }
                        >
                          Approve
                        </a>
                      </div>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={async () =>
                            await handleClickReject(candidate?.address, message)
                          }
                        >
                          Reject
                        </a>
                      </div>
                    </>
                  )
                )}

                {candidate &&
                  user &&
                  path === "candidate" &&
                  candidate.status === "Approved" &&
                  user.status === "Approved" &&
                  !user?.hasVoted &&
                  currentVotingTime >= votingTime?.startDateN &&
                  currentVotingTime <= votingTime?.endDateN && (
                    <>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={async () =>
                            await giveVote(candidate?.address)
                          }
                        >
                          Give Vote
                        </a>
                      </div>
                    </>
                  )}

                {candidate &&
                  path === "candidate" &&
                  candidate?.status &&
                  checkVote === "Approved" && (
                    <div className="custom-actions">
                      <a className="custom-read">Already Voted</a>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {publicKey === ownerPublicKey ||
          (publicKey === candidate?.address && (
            <p className="mt-16 align-items-center">
              <Preview pdf={candidate?.pdf} />
            </p>
          ))}
      </div>
    </section>
  );
};

export default Details;
