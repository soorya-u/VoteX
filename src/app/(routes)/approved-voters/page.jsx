"use client";

import { useEffect, useState } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "@/components";

import { useVotingDapp } from "@/hooks/use-contract";

export default function ApprovedVotersPage() {
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState(false);

  const { getRegisteredVoters } = useVotingDapp();

  function filterUsersByStatus(users, status) {
    return users?.filter((user) => user.status === status);
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await getRegisteredVoters();

      const approvedUsers = filterUsersByStatus(items, "Approved");
      setCandidates(approvedUsers);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team candidates={candidates} path={"voter"} />
      <Footer />
    </>
  );
}
