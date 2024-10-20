"use client";

import { useEffect, useState } from "react";
import { Preloader, Footer, Header, Team } from "@/components";
import Loader from "@/components/Global/Loader";
import { useContract } from "@/hooks/use-contract";

export default function ApprovedCandidatesPage() {
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
  } = useContract();

  function filterUsersByStatus(users, status) {
    return users?.filter((user) => user.status === status);
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await getRegisteredCandidates();

      const approvedUsers = filterUsersByStatus(items, "Approved");
      setCandidates(approvedUsers);

      const votingStatus = await initContractData();
      setVotingTime(votingStatus);

      const nowInSeconds = Math.floor(Date.now() / 1000);
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
      <Header />
      <Team
        candidates={candidates}
        path="candidate"
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
}
