import { useEffect, useState } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "@/components";
import Loader from "@/components/Global/Loader";
import { useVotingDapp } from "@/hooks/use-voting-dapp";

const registerCandidate = () => {
  const [candidates, setCandidates] = useState();
  const [votingTime, setVotingTime] = useState();
  const [currentVotingTime, setCurrentVotingTime] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const {
    loader,
    getRegisteredCandidates,
    giveVote,
    checkVote,
    initContractData,
    getSingleVoter,
    publicKey,
  } = useVotingDapp();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await getRegisteredCandidates();
      setCandidates(items);

      const votingStatus = await initContractData();
      setVotingTime(votingStatus);

      const nowInMilliseconds = Date.now();
      const nowInSeconds = Math.floor(nowInMilliseconds / 1000);
      setCurrentVotingTime(nowInSeconds);

      if (!publicKey) return;
      const user = await getSingleVoter(publicKey);
      setUser(user);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team
        candidates={candidates}
        path={"candidate"}
        giveVote={giveVote}
        checkVote={checkVote}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
        user={user}
      />
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default registerCandidate;
