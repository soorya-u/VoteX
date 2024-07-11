import Banner from "./Banner";
import Details from "./Details";

const TeamDetail = ({
  candidate,
  path,
  handleClickApprove,
  handleClickReject,
  giveVote,
  OWNER_ADDRESS,
  address,
  checkVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  return (
    <>
      <Banner />
      <Details
        candidate={candidate}
        path={path}
        handleClickApprove={handleClickApprove}
        handleClickReject={handleClickReject}
        giveVote={giveVote}
        OWNER_ADDRESS={OWNER_ADDRESS}
        address={address}
        checkVote={checkVote}
        user={user}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
      />
    </>
  );
};

export default TeamDetail;
