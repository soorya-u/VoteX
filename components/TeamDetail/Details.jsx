import { useState } from "react";
import Link from "next/link";

import { useVotingDapp } from "@/hooks/use-voting-dapp";
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
                <p className="mb-4">
                  Hey there! So glad you stopped by to Meet Our Company. Don't
                  miss out on this opportunity to learn about what we do and the
                  amazing team that makes it all happen!
                </p>
                <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                  <li>
                    <strong>Address :&nbsp;&nbsp; </strong>{" "}
                    {shortenAddress(candidate?.address)}
                  </li>
                  <li>
                    <strong>Approval:&nbsp;&nbsp; </strong>{" "}
                    {candidate?.status == 0
                      ? "Pending"
                      : candidate?.status
                      ? "Accepted"
                      : "Rejected"}
                  </li>
                  <li>
                    <strong>RegisterId:&nbsp;&nbsp; </strong> #
                    {candidate?.registerId}
                  </li>
                  <li>
                    <strong>VoteCount:&nbsp;&nbsp; </strong>{" "}
                    {candidate?.voteCount}
                  </li>
                </ul>
                {path == "voter" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>AddressDetails:&nbsp;&nbsp; </strong>{" "}
                      {candidate?._addressDetails}
                    </li>
                    <li>
                      <strong>AssemblyConstituency :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._assemblyConstituencyNumberAndName}
                    </li>
                  </ul>
                )}

                {path == "candidate" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Affidavit:&nbsp;&nbsp; </strong>{" "}
                      {candidate?._affidavit}
                    </li>
                    <li>
                      <strong>AssetsAndLiabilities :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._assetsAndLiabilities}
                    </li>
                  </ul>
                )}

                {path == "voter" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>Dob Or Age :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._dobOrAge}
                    </li>
                    <li>
                      <strong>_epicNumber :&nbsp;&nbsp; </strong>{" "}
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
                      <strong>_hologramAndBarcode :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._hologramAndBarcode}
                    </li>
                    <li>
                      <strong>_gender :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._gender}
                    </li>
                  </ul>
                )}

                {path === "candidate" && (
                  <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                    <li>
                      <strong>ElectoralRollEntry :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._electoralRollEntry}
                    </li>
                    <li>
                      <strong>_nominationForm :&nbsp;&nbsp; </strong>{" "}
                      {candidate?._nominationForm}
                    </li>
                  </ul>
                )}

                <p className="mb-4 mt-10">
                  <strong>Notice:</strong> {candidate?.message}
                </p>
                {publicKey === candidate.address &&
                candidate?.status === "Pending" ? (
                  <div className="custom-actions mb-6">
                    <a
                      className="custom-read"
                      href={
                        path === "candidate"
                          ? "/update-candidate"
                          : "/update-voter"
                      }
                    >
                      Update Profile
                    </a>
                  </div>
                ) : (
                  publicKey === candidate.address &&
                  candidate?.status == "Rejected" && (
                    <div className="custom-actions mb-6">
                      <a
                        className="custom-read"
                        href={
                          path == "candidate"
                            ? "/update-candidate"
                            : "/update-voter"
                        }
                      >
                        Update Profile
                      </a>
                    </div>
                  )
                )}

                {publicKey === ownerPublicKey &&
                candidate.status === "Pending" ? (
                  <>
                    <div className="single-input">
                      <textarea
                        className="fs-six-up bg_transparent"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"message"}
                      ></textarea>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="custom-actions"
                    >
                      <a
                        className="custom-read"
                        onClick={() =>
                          handleClickApprove(candidate?.address, message)
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
                        onClick={() =>
                          handleClickReject(candidate?.address, message)
                        }
                      >
                        Reject
                      </a>
                    </div>
                  </>
                ) : (
                  publicKey === ownerPublicKey &&
                  candidate.status === "Rejected" && (
                    <>
                      <div className="single-input">
                        <textarea
                          className="fs-six-up bg_transparent"
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={"message"}
                        ></textarea>
                      </div>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={() =>
                            handleClickApprove(candidate?.address, message)
                          }
                        >
                          Approve
                        </a>
                      </div>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={() =>
                            handleClickReject(candidate?.address, message)
                          }
                        >
                          Reject
                        </a>
                      </div>
                    </>
                  )
                )}

                {path === "candidate" &&
                  candidate.status === "Approved" &&
                  user.status === "Approved" &&
                  !user?.hasVoted &&
                  currentVotingTime >= votingTime?.startDateN &&
                  currentVotingTime <= votingTime?.endDateN && (
                    <>
                      <div className="custom-actions">
                        <a
                          className="custom-read"
                          onClick={() => giveVote(candidate?.address)}
                        >
                          Give Vote
                        </a>
                      </div>
                    </>
                  )}

                {path === "candidate" &&
                  candidate?.status &&
                  checkVote === "Approved" && (
                    <div className="custom-actions">
                      <a className="custom-read">Already Voted</a>
                    </div>
                  )}

                <ul className="social-area d-flex align-items-center gap-2 gap-md-3 mt-8 mt-lg-10">
                  <li>
                    <Link href="/">
                      <a className="d-center fs-four">
                        <i className="ti ti-brand-facebook" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a className="d-center fs-four">
                        <i className="ti ti-brand-twitch" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a className="d-center fs-four">
                        <i className="ti ti-brand-instagram" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a className="d-center fs-four">
                        <i className="ti ti-brand-discord-filled" />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {publicKey === ownerPublicKey && (
          <p className="mt-16 align-items-center">
            <Preview pdf={candidate?.pdf} />
          </p>
        )}
      </div>
    </section>
  );
};

export default Details;
