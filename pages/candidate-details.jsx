import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  TeamDetail,
} from "../components";
import Loader from "../components/Global/Loader";

import { useVotingDapp } from "@/hooks/use-voting-dapp";

const candidateDetails = () => {
  const router = useRouter();
  const [candidate, setCandidate] = useState();
  const [user, setUser] = useState();
  const [votingTime, setVotingTime] = useState();
  const [loading, setLoading] = useState(false);
  const [currentVotingTime, setCurrentVotingTime] = useState();

  const {
    loader,
    publicKey,
    getSingleCandidate,
    approveCandidate: approveCandidateFn,
    giveVote,

    checkVote,
    rejectCandidate: rejectCandidateFn,
    getSingleVoter,
    initContractData,
  } = useVotingDapp();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!router.isReady) return;

      const items = await getSingleCandidate(router?.query.address);
      setCandidate(items);

      const votingStatus = await initContractData();
      setVotingTime(votingStatus);

      const nowInSeconds = Math.floor(Date.now() / 1000);
      setCurrentVotingTime(nowInSeconds);

      if (!publicKey) return;
      const user = await getSingleVoter(publicKey);
      setUser(user);
    };

    fetchData().finally(() => setLoading(false));
  }, [router.isReady]);

  const approveCandidate = async (address, message) => {
    await approveCandidateFn(address, message);
  };

  const rejectCandidate = async (address, message) => {
    await rejectCandidateFn(address, message);
  };
  //
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <TeamDetail
        candidate={candidate}
        path={"candidate"}
        handleClickApprove={approveCandidate}
        handleClickReject={rejectCandidate}
        giveVote={giveVote}
        checkVote={checkVote}
        user={user}
        votingTime={votingTime}
        currentVotingTime={currentVotingTime}
      />
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default candidateDetails;
