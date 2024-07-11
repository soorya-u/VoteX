import React, { useEffect, useState, useContext } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "../components/index";
//IMPORTING CONTRCT DATA
import { VotingDappContext } from "../context/context";

const registerVoters = () => {
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState(false);

  const { GET_registerVoterS } = useContext(VotingDappContext);

  function filterUsersByStatus(users, status) {
    return users?.filter((user) => user.status === status);
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await GET_registerVoterS();

      const approvedUsers = filterUsersByStatus(items, 1);
      setCandidates(approvedUsers);
      console.log(approvedUsers);
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
