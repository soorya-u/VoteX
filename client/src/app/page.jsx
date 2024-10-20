"use client";

import { useState, useEffect } from "react";

import {
  Preloader,
  Footer,
  Header,
  HeroSection,
  WhyVote,
  Blog,
  Provide,
  Vote,
} from "@/components";

import { useContract } from "@/hooks/use-contract";

export default function IndexPage() {
  const [initialData, setInitialData] = useState();
  const [highest, setHighest] = useState();
  const [loading, setLoading] = useState(false);

  const { highestVotedCandidate, initContractData } = useContract();

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  const fetchData = async () => {
    const initialData = await initContractData();
    setInitialData(initialData);
    const items = await highestVotedCandidate();
    setHighest(items);
  };

  return (
    <>
      {loading && <Preloader />}
      <Header />
      <HeroSection initialData={initialData} highest={highest} />
      <WhyVote />
      <Provide />
      <Vote />
      <Blog />
      <Footer />
    </>
  );
}
