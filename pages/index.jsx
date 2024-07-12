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

  const { highestVotedCandidate, initContractData } = useVotingDapp();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await highestVotedCandidate();
      const initialData = await initContractData();
      setHighest(items);
      setInitialData(initialData);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <HeroSection initialData={initialData} higest={highest} />
      <WhyVote />
      <Provide />
      <Vote />
      <Blog />
      <Footer />
    </>
  );
};

export default index;
