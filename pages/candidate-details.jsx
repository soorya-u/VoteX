import React, { useEffect, useState, useContext } from "react";
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

import { VotingDappContext } from "../context";

const candidateDetails = () => {
  const router = useRouter();
  const [candidate, setCandidate] = useState();
  const [user, setUser] = useState();
  const [votingTime, setVotingTime] = useState();
  const [loading, setLoading] = useState(false);
  const [currentVotingTime, setCurrentVotingTime] = useState();

  const {
    loader,
    address,
    checkIfWalletIsConnected,
    GET_SINGLE_CANDIDATE,
    approveCandidate,
    giveVote,
    OWNER_ADDRESS,
    ALL_VOTERS_VOTED,
    checkVote,
    rejectCandidate,
    GET_SINGLE_VOTER,
    INITIAL_CONTRACT_DATA,
  } = useContext(VotingDappContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!router.isReady) return;

      const items = await GET_SINGLE_CANDIDATE(router?.query.address);
      setCandidate(items);

      const allVotedVoter = await ALL_VOTERS_VOTED();
      console.log(items);

      const votingStatus = await INITIAL_CONTRACT_DATA();
      setVotingTime(votingStatus);

      const nowInMilliseconds = Date.now();
      const nowInSeconds = Math.floor(nowInMilliseconds / 1000);
      setCurrentVotingTime(nowInSeconds);

      const address = await checkIfWalletIsConnected();

      if (address) {
        const user = await GET_SINGLE_VOTER(address);
        setUser(user);
        console.log(user);
      }
    };

    fetchData().finally(() => setLoading(false));
  }, [router.isReady]);

  const approveCandidate = async (address, message) => {
    await approveCandidate(address, message);
  };

  const rejectCandidate = async (address, message) => {
    await rejectCandidate(address, message);
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
        OWNER_ADDRESS={OWNER_ADDRESS}
        address={address}
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
