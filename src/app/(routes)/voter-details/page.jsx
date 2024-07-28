"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useVotingDapp } from "@/hooks/use-contract";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  TeamDetail,
} from "@/components";

import Loader from "@/components/Global/Loader";

export default function VoterDetailsPage() {
  const searchParams = useSearchParams();
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
      const items = await getSingleVoter(searchParams.get("address"));
      setVoter(items);
    };
    fetchData().finally(() => setLoading(false));
  }, []);

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
}
