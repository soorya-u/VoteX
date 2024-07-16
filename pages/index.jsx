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

import { useVotingDapp } from "@/hooks/use-voting-dapp";

const index = () => {
  const [initialData, setInitialData] = useState();
  const [highest, setHighest] = useState();
  const [loading, setLoading] = useState(false);

  const { highestVotedCandidate, initContractData, publicKey } =
    useVotingDapp();

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
};

export default index;
