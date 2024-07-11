import { useEffect, useState, useContext } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "../components";
import { VotingDappContext } from "../context";

const registerVoters = () => {
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState();
  const { GET_registerVoterS } = useContext(VotingDappContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await GET_registerVoterS();
      setCandidates(items);
      console.log(items);
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
};

export default registerVoters;
