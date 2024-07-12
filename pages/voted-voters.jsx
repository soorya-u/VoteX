import { useEffect, useState } from "react";

import { useVotingDapp } from "@/hooks/use-voting-dapp";

import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "@/components";

const allVotersVoted = () => {
  const [voters, setVoters] = useState();

  const { votedVoters } = useVotingDapp();
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
};

export default allVotersVoted;
