import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useVotingDapp } from "@/hooks/use-voting-dapp";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  TeamDetail,
} from "@/components";

import Loader from "@/components/Global/Loader";

const voterDetails = () => {
  const router = useRouter();
  const [voter, setVoter] = useState();
  const [loading, setLoading] = useState(false);

  const {
    loader,
    getSingleVoter,
    approveVoter: approveVoterFn,
    rejectVoter: rejectVoterFn,
  } = useVotingDapp();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!router.isReady) return;

      const items = await getSingleVoter(router?.query.address);
      setVoter(items);
    };
    fetchData().finally(() => setLoading(false));
  }, [router.isReady]);

  console.log(voter);

  const approveVoter = async (address, message) => {
    await approveVoterFn(address, message);
  };
  const rejectVoter = async (address, message) => {
    await rejectVoterFn(address, message);
  };
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <TeamDetail
        candidate={voter}
        path={"voter"}
        handleClickApprove={approveVoter}
        handleClickReject={rejectVoter}
      />
      {loader && <Loader />}
      <Footer />
    </>
  );
};

export default voterDetails;
