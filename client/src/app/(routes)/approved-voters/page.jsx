"use client";

import { useEffect, useState } from "react";
import { Preloader, Footer, Header, Team } from "@/components";

import { useContract } from "@/hooks/use-contract";

export default function ApprovedVotersPage() {
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState(false);

  const { getRegisteredVoters } = useContract();

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
      <Header />
      <Team candidates={candidates} path={"voter"} />
      <Footer />
    </>
  );
}
