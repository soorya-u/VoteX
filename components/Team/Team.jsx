import Banner from "./Banner";
import Member from "./Member";

const Team = ({
  candidates,
  path,
  giveVote,
  checkVote,
  votingTime,
  currentVotingTime,
  user,
}) => {
  return (
    <>
      <Banner />
      <Member
        candidates={candidates}
        path={path}
        giveVote={giveVote}
        checkVote={checkVote}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
        user={user}
      />
    </>
  );
};

export default Team;
