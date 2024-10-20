import Link from "next/link";

const Member = ({
  candidates,
  path,
  giveVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  return (
    <section className="team pt-120 pb-120 position-relative z-0">
      <div className="container">
        <div className="row gy-8">
          {candidates?.length <= 0 ? (
            <h2 style={{ textAlign: "center" }}>
              No {path}s have been registered yet.
            </h2>
          ) : (
            candidates?.map((item, index) => (
              <div
                key={index + 1}
                className="new-custom-position col-sm-6 col-lg-4 col-xxl-3"
              >
                <div className="team__card nb3-bg cus-rounded-1 overflow-hidden">
                  <div className="team__thumbs position-relative">
                    <img src={item?.image} alt="Image" className="w-100" />
                  </div>
                  <div className="team__content pseudo_element_after transition text-center py-6 py-lg-7 py-xxl-8 px-4 px-lg-5 px-xxl-6">
                    <Link
                      href={
                        path === "candidate"
                          ? {
                              pathname: "/candidate-details",
                              query: {
                                address: item?.address,
                              },
                            }
                          : {
                              pathname: "/voter-details",
                              query: {
                                address: item?.address,
                              },
                            }
                      }
                    >
                      <h5 className="team__title d-center pb-4 mb-4 pseudo_element_after">
                        {item?._name}{" "}
                      </h5>
                    </Link>
                    <p className="new-custom-top">
                      <strong>{item?.status}</strong>
                    </p>

                    {path === "candidate" &&
                      item?.status === "Approved" &&
                      user?.status === "Approved" &&
                      !user?.hasVoted &&
                      currentVotingTime >= votingTime?.startDateN &&
                      currentVotingTime <= votingTime?.endDateN && (
                        <>
                          <p>Total Vote: {item?.voteCount}</p>

                          <div
                            style={{ cursor: "pointer" }}
                            className="custom-actions"
                          >
                            <a
                              className="custom-read"
                              style={{ cursor: "pointer" }}
                              onClick={() => giveVote(item?.address)}
                            >
                              Give Vote
                            </a>
                          </div>
                        </>
                      )}

                    {path === "candidate" &&
                      item?.status === "Approved" &&
                      user?.hasVoted && (
                        <>
                          <p>Total Vote: {item?.voteCount}</p>

                          <div className="custom-actions">
                            <a className="custom-read">Already Voted</a>
                          </div>
                        </>
                      )}

                    {path === "candidate" && item?.status === "Pending" && (
                      <>
                        <div className="custom-actions">
                          <a className="custom-read">Status: Pending</a>
                        </div>
                      </>
                    )}

                    {path === "voter" && item?.status === "Approved" && (
                      <>
                        <div className="custom-actions">
                          <a className="custom-read">
                            {item?.hasVoted ? "Already Voted" : "Not Voted"}
                          </a>
                        </div>
                      </>
                    )}
                    {path === "voter" && item?.status === "Pending" && (
                      <>
                        <div className="custom-actions">
                          <a className="custom-read">Status: Pending</a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Member;
