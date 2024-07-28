"use client";

import { useState, useEffect } from "react";

import {
  Cursor,
  Preloader,
  ScrollToTop,
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

  const { highestVotedCandidate, initContractData, publicKey } =
    useContract();

  useEffect(() => {
    if (!publicKey) return;
    setLoading(true);
    const fetchData = async () => {
      const items = await highestVotedCandidate();
      setHighest(items);
      const initialData = await initContractData();
      setInitialData(initialData);
    };

    fetchData().finally(() => setLoading(false));
  }, [publicKey]);

  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
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
