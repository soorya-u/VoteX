"use client";

import { useEffect, useState } from "react";

import { useContract } from "@/hooks/use-contract";

import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "@/components";

export default function VotedVotersPage() {
  const [voters, setVoters] = useState();

  const { votedVoters } = useContract();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await votedVoters();
      setVoters(items);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team candidates={voters} path={"voter"} />
      <Footer />
    </>
  );
}
